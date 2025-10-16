import { NextRequest, NextResponse } from "next/server";
import { supaServer } from "@/lib/supa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const supabase = await supaServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Parse request body
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    const { priceId } = body;
    if (!priceId) {
      return new NextResponse("Price ID is required", { status: 400 });
    }

    // 3. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/studio?payment=success`,
      cancel_url: `${appUrl}/pricing`,
      metadata: {
        userId: user.id,
      },
    });

    if (!session.url) {
      throw new Error("Failed to create a checkout session URL.");
    }

    // 4. Return the session URL
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Provisioning error:", error);
    return new NextResponse(error.message || "Failed to create checkout session", { status: 500 });
  }
}