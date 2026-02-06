// src/app/api/support/tickets/route.ts
// GET /api/support/tickets - List tickets
// POST /api/support/tickets - Create ticket

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { validateInput, createTicketSchema } from '@/lib/validation';
import { handleError, AuthenticationError, successResponse } from '@/lib/errors';
import { logAudit } from '@/lib/logger';

/**
 * GET /api/support/tickets - List support tickets
 */
export async function GET(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const tickets = await query(
      `SELECT id, subject, description, priority, status, assigned_to, created_at, updated_at
       FROM support_tickets
       WHERE company_id = $1
       ORDER BY created_at DESC`,
      [companyId]
    );

    return NextResponse.json(successResponse(tickets.rows), { status: 200 });
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}

/**
 * POST /api/support/tickets - Create support ticket
 */
export async function POST(request: NextRequest) {
  try {
    const companyId = request.headers.get('x-company-id');
    if (!companyId) {
      throw new AuthenticationError();
    }

    const body = await request.json();

    // Validate input
    const validation = await validateInput(createTicketSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { subject, description, priority } = validation.data;

    const result = await query(
      `INSERT INTO support_tickets (company_id, subject, description, priority, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, subject, description, priority, status, created_at`,
      [companyId, subject, description, priority || 'medium', 'open']
    );

    const ticket = result.rows[0];

    logAudit('support_ticket_created', 'support_ticket', ticket.id, { companyId, subject });

    return NextResponse.json(
      successResponse(ticket, 'Support ticket created'),
      { status: 201 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
