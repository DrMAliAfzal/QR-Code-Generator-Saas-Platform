import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' as any,
  });

  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orgId = session.metadata?.orgId;
        const planId = session.metadata?.planId;
        
        if (orgId && planId) {
          // Update Organization Plan
          await prisma.organization.update({
            where: { id: orgId },
            data: { planId: planId }
          });
          
          // Also create/update subscription record
          if (session.subscription) {
            const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as any;
            await prisma.subscription.create({
              data: {
                orgId: orgId,
                planId: planId,
                status: subscription.status,
                stripeSubscriptionId: subscription.id,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000)
              }
            });
          }
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: 'canceled' }
        });
        
        // Find org and remove planId (Revert to Free)
        const dbSub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id }
        });
        if (dbSub) {
           await prisma.organization.update({
             where: { id: dbSub.orgId },
             data: { planId: null }
           });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook processing failed:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
