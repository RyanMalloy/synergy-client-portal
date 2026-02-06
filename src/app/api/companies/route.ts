// src/app/api/companies/route.ts
// GET /api/companies - Get authenticated company details
// PATCH /api/companies - Update company

import { NextRequest, NextResponse } from 'next/server';
import { queryOne, query } from '@/lib/db';
import { validateInput, updateCompanySchema } from '@/lib/validation';
import { handleError, AuthenticationError, NotFoundError, successResponse } from '@/lib/errors';
import { logAudit } from '@/lib/logger';

/**
 * GET /api/companies - Get company details
 */
export async function GET(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const company = await queryOne(
      `SELECT id, name, email, status, billing_email, billing_address, trial_ends_at
       FROM companies WHERE id = $1`,
      [companyId]
    );

    if (!company) {
      throw new NotFoundError('Company');
    }

    // Get active subscriptions count
    const subscriptions = await query(
      `SELECT COUNT(*) as count FROM subscriptions
       WHERE company_id = $1 AND status IN ('active', 'trial')`,
      [companyId]
    );

    return NextResponse.json(
      successResponse({
        ...company,
        activeServices: parseInt(subscriptions.rows[0]?.count || 0),
      }),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}

/**
 * PATCH /api/companies - Update company
 */
export async function PATCH(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const body = await request.json();

    // Validate input
    const validation = await validateInput(updateCompanySchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { name, billingEmail, billingAddress } = validation.data;

    // Build update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }

    if (billingEmail) {
      updates.push(`billing_email = $${paramIndex++}`);
      values.push(billingEmail);
    }

    if (billingAddress) {
      updates.push(`billing_address = $${paramIndex++}`);
      values.push(billingAddress);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'No fields to update' },
        },
        { status: 400 }
      );
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');

    const result = await query(
      `UPDATE companies SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, name, email, status`,
      [...values, companyId]
    );

    if (!result.rows[0]) {
      throw new NotFoundError('Company');
    }

    logAudit('company_updated', 'company', companyId, validation.data);

    return NextResponse.json(
      successResponse(result.rows[0], 'Company updated'),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
