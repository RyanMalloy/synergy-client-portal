// src/app/api/services/route.ts
// GET /api/services - List available services

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleError, successResponse } from '@/lib/errors';

/**
 * GET /api/services - List all active services
 */
export async function GET(_request: NextRequest) {
  try {
    const services = await query(
      `SELECT id, name, description, base_price_cents, billing_cycle, features, tier, status
       FROM services
       WHERE status = $1
       ORDER BY base_price_cents ASC`,
      ['active']
    );

    return NextResponse.json(
      successResponse(
        services.rows.map((service) => ({
          ...service,
          basePrice: service.base_price_cents / 100, // Convert cents to dollars
        }))
      ),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
