// src/app/api/invoices/route.ts
// GET /api/invoices - List company invoices

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleError, AuthenticationError, successResponse } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const invoices = await query(
      `SELECT
        id, invoice_number, amount_cents, currency, status,
        due_date, paid_at, pdf_url, created_at
       FROM invoices
       WHERE company_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [companyId]
    );

    return NextResponse.json(
      successResponse(
        invoices.rows.map((inv) => ({
          ...inv,
          amount: inv.amount_cents / 100,
        }))
      ),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
