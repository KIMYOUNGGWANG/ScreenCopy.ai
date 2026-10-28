import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'
import { sendPaymentReceiptEmail } from '@/lib/email' // Import sendPaymentReceiptEmail

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: Request) {
  const supabase = createClient()
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new NextResponse('No stripe-signature header', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const creditsToAdd = parseInt(session.metadata?.credits || '0', 10)
      const stripePaymentId = session.id
      const customerEmail = session.customer_details?.email || ''

      if (!userId || !creditsToAdd) {
        console.error('Missing userId or credits in session metadata')
        return new NextResponse('Missing metadata', { status: 400 })
      }

      try {
        // Update user credits
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('credits')
          .eq('id', userId)
          .single()

        if (fetchError || !profile) {
          console.error('Error fetching profile for credit update:', fetchError)
          throw new Error('Profile not found or fetch error')
        }

        const newCredits = profile.credits + creditsToAdd
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('id', userId)

        if (updateError) {
          console.error('Error updating user credits:', updateError)
          throw new Error('Failed to update user credits')
        }

        // Record transaction
        const { error: transactionError } = await supabase.from('transactions').insert({
          user_id: userId,
          amount: session.amount_total ? session.amount_total / 100 : 0, // amount_total is in cents
          credits_added: creditsToAdd,
          stripe_payment_id: stripePaymentId,
          status: 'completed',
        })

        if (transactionError) {
          console.error('Error recording transaction:', transactionError)
          throw new Error('Failed to record transaction')
        }

        // Send payment receipt email
        if (customerEmail) {
          await sendPaymentReceiptEmail(
            customerEmail,
            session.amount_total ? session.amount_total / 100 : 0,
            creditsToAdd,
            stripePaymentId
          )
        }

        console.log(`User ${userId} successfully purchased ${creditsToAdd} credits.`)
      } catch (dbError: any) {
        console.error('Database operation failed for webhook:', dbError.message)
        return new NextResponse(`Database operation failed: ${dbError.message}`, { status: 500 })
      }
      break
    default:
      console.warn(`Unhandled event type ${event.type}`)
  }

  return new NextResponse('ok', { status: 200 })
}
