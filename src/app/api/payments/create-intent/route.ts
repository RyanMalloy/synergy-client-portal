// src/app/api/payments/create-intent/route.ts
// POST /api/payments/create-intent - Create Stripe PaymentIntent

import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import { createPaymentIntent } from '@/lib/stripe';
import { validateInput, createPaymentIntentSchema } from '@/lib/validation';
import { handleError, AuthenticationError, NotFoundError, successResponse } from '@/lib/errors';
import { logPayment } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const body = await request.json();

    // Validate input
    const validation = await validateInput(createPaymentIntentSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { subscriptionId, amount } = validation.data;

    // Verify subscription belongs to company
    const subscription = await queryOne<{ service_id: string }>(
      'SELECT service_id FROM subscriptions WHERE id = $1 AND company_id = $2',
      [subscriptionId, companyId]
    );

    if (!subscription) {
      throw new NotFoundError('Subscription');
    }

    // Create PaymentIntent
    const intent = await createPaymentIntent(companyId, amount, 'usd', {
      subscriptionId,
    });

    // Record payment in database
    await query(
      `INSERT INTO payments (company_id, subscription_id, amount_cents, currency, stripe_payment_intent_id, status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [companyId, subscriptionId, amount, 'USD', intent.id, 'pending']
    );

    logPayment('payment_intent_created', {
      companyId,
      subscriptionId,
      amount,
      intentId: intent.id,
    });

    return NextResponse.json(
      successResponse(
        {
          clientSecret: intent.client_secret,
          intentId: intent.id,
        },
        'Payment intent created'
      ),
      { status: 201 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
