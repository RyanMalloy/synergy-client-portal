// src/app/api/subscriptions/[id]/route.ts
// GET /api/subscriptions/[id] - Get subscription
// DELETE /api/subscriptions/[id] - Cancel subscription

import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { cancelSubscriptionAtPeriodEnd } from '@/lib/stripe';
import { handleError, AuthenticationError, NotFoundError, successResponse } from '@/lib/errors';
import { logSubscription, logAudit } from '@/lib/logger';

/**
 * GET /api/subscriptions/[id] - Get subscription details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const subscription = await queryOne(
      `SELECT
        s.id, s.company_id, s.service_id, s.status,
        s.stripe_subscription_id, s.current_period_start, s.current_period_end,
        s.cancel_at_period_end, s.created_at, s.updated_at,
        svc.name, svc.base_price_cents, svc.billing_cycle, svc.features
       FROM subscriptions s
       JOIN services svc ON s.service_id = svc.id
       WHERE s.id = $1 AND s.company_id = $2`,
      [id, companyId]
    );

    if (!subscription) {
      throw new NotFoundError('Subscription');
    }

    return NextResponse.json(successResponse(subscription), { status: 200 });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}

/**
 * DELETE /api/subscriptions/[id] - Cancel subscription
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const subscription = await queryOne<{ stripe_subscription_id: string }>(
      `SELECT stripe_subscription_id FROM subscriptions
       WHERE id = $1 AND company_id = $2`,
      [id, companyId]
    );

    if (!subscription) {
      throw new NotFoundError('Subscription');
    }

    // Cancel at period end (more user-friendly than immediate)
    await cancelSubscriptionAtPeriodEnd(subscription.stripe_subscription_id);

    logSubscription('subscription_cancel_scheduled', {
      companyId,
      subscriptionId: id,
    });

    logAudit('subscription_canceled', 'subscription', id, { companyId });

    return NextResponse.json(
      successResponse(
        { status: 'cancel_scheduled' },
        'Subscription will be canceled at the end of the billing period'
      ),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
