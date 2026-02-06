// src/app/api/subscriptions/route.ts
// GET /api/subscriptions - List company subscriptions
// POST /api/subscriptions - Create new subscription

import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { createSubscription } from '@/lib/stripe';
import { handleError, AuthenticationError, NotFoundError, ConflictError, successResponse } from '@/lib/errors';
import { logSubscription, logAudit } from '@/lib/logger';

/**
 * GET /api/subscriptions - List subscriptions
 */
export async function GET(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const subscriptions = await query(
      `SELECT
        s.id, s.company_id, s.service_id, s.status,
        s.stripe_subscription_id, s.current_period_start, s.current_period_end,
        s.cancel_at_period_end, s.created_at, s.updated_at,
        svc.name, svc.base_price_cents, svc.billing_cycle, svc.features, svc.tier
       FROM subscriptions s
       JOIN services svc ON s.service_id = svc.id
       WHERE s.company_id = $1
       ORDER BY s.created_at DESC`,
      [companyId]
    );

    return NextResponse.json(
      successResponse(subscriptions.rows),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}

/**
 * POST /api/subscriptions - Create subscription
 */
export async function POST(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const body = await request.json();
    const { serviceId } = body;

    if (!serviceId) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'serviceId required' },
        },
        { status: 400 }
      );
    }

    // Verify service exists
    const service = await queryOne<{ stripe_price_id: string }>(
      'SELECT stripe_price_id FROM services WHERE id = $1 AND status = $2',
      [serviceId, 'active']
    );

    if (!service) {
      throw new NotFoundError('Service');
    }

    // Check for duplicate subscription
    const existing = await query(
      'SELECT id FROM subscriptions WHERE company_id = $1 AND service_id = $2',
      [companyId, serviceId]
    );

    if (existing.rows.length > 0) {
      throw new ConflictError('Already subscribed to this service');
    }

    // Create subscription via Stripe
    const stripeSubscription = await createSubscription(companyId, service.stripe_price_id, {
      serviceId,
    });

    logSubscription('subscription_created', { companyId, serviceId, stripeId: stripeSubscription.id });
    logAudit('subscription_created', 'subscription', '', { companyId, serviceId });

    return NextResponse.json(
      successResponse(
        {
          id: stripeSubscription.id,
          status: stripeSubscription.status,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        },
        'Subscription created'
      ),
      { status: 201 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
