import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supaAdmin } from "@/lib/supa-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Maps Stripe Price IDs to the number of credits.
// TODO: Keep this in sync with your Stripe Products.
const creditsMap: { [key: string]: number } = {
  "price_1Pj9YkRpHK3nI4qHeC6a7g2g": 50,
  "price_1Pj9ZWRpHK3nI4qHnQdKUKb3": 250,
};

async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("Stripe webhook error: Missing signature");
    return new NextResponse("Webhook Error: Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Stripe webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const { userId } = session.metadata || {};
      if (!userId) {
        throw new Error("Webhook Error: No userId in session metadata");
      }

      // Retrieve the session with line items to get the price ID
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items"] }
      );

      const priceId = sessionWithLineItems.line_items?.data[0]?.price?.id;
      if (!priceId) {
        throw new Error(`Webhook Error: Could not find priceId for session ${session.id}`);
      }

      const creditsToAdd = creditsMap[priceId];
      if (creditsToAdd === undefined) {
        throw new Error(`Webhook Error: No credits mapping found for priceId ${priceId}`);
      }

      // 1. Add credits to the user's profile
      const { data: profile, error: profileError } = await supaAdmin
        .from("profiles")
        .select("credits")
        .eq("id", userId)
        .single();

      if (profileError) throw new Error(`Failed to retrieve profile for user ${userId}: ${profileError.message}`);

      const newCredits = (profile.credits || 0) + creditsToAdd;

      const { error: updateError } = await supaAdmin
        .from("profiles")
        .update({ credits: newCredits })
        .eq("id", userId);

      if (updateError) throw new Error(`Failed to update credits for user ${userId}: ${updateError.message}`);

      // 2. Log the transaction
      const { error: transactionError } = await supaAdmin
        .from("transactions")
        .insert({
          user_id: userId,
          amount: (session.amount_total || 0) / 100, // Stripe amount is in cents
          credits_added: creditsToAdd,
          stripe_payment_id: session.payment_intent,
          status: "completed",
        });

      if (transactionError) throw new Error(`Failed to log transaction for user ${userId}: ${transactionError.message}`);

      console.log(`Successfully provisioned ${creditsToAdd} credits for user ${userId}`);

    } catch (error: any) {
      console.error(error.message);
      // We don't return a 500 here because we don't want Stripe to retry this webhook
      // if it's a data issue (e.g., missing metadata). We log the error for manual inspection.
    }
  }

  return new NextResponse("OK", { status: 200 });
}

export { POST };
