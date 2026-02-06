// src/app/api/webhooks/stripe/route.ts
// POST /api/webhooks/stripe - Stripe webhook handler

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleStripeWebhook } from '@/lib/stripe';
import { logger } from '@/lib/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      logger.error('Missing signature or webhook secret');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify and construct event
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      logger.error('Webhook signature verification failed', { error });
      return NextResponse.json({ error: 'Webhook verification failed' }, { status: 401 });
    }

    // Handle the event
    const result = await handleStripeWebhook(event);

    if (result.success) {
      return NextResponse.json({ received: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error) {
    logger.error('Webhook error', { error });
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
