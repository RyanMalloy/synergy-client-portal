// src/app/api/auth/register/route.ts
// POST /api/auth/register - User registration

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';
import { createStripeCustomer } from '@/lib/stripe';
import { validateInput, signupSchema } from '@/lib/validation';
import { handleError, ConflictError, ValidationError, successResponse } from '@/lib/errors';
import { logAuth } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = await validateInput(signupSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { email, password, companyName } = validation.data;

    // Check if email already exists
    const existing = await query('SELECT id FROM companies WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'CONFLICT', message: 'Email already registered' },
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create company
    const companyResult = await query(
      `INSERT INTO companies (name, email, password_hash, status, trial_ends_at)
       VALUES ($1, $2, $3, $4, NOW() + INTERVAL '14 days')
       RETURNING id, email`,
      [companyName, email, passwordHash, 'trial']
    );

    const company = companyResult.rows[0];
    const companyId = company.id;

    // Create Stripe customer
    let stripeCustomerId: string | null = null;
    try {
      stripeCustomerId = await createStripeCustomer(companyId, email, companyName);
      await query('UPDATE companies SET stripe_customer_id = $1 WHERE id = $2', [
        stripeCustomerId,
        companyId,
      ]);
    } catch (error) {
      // Log but don't fail registration
      logAuth('stripe_customer_creation_failed', { companyId, error });
    }

    // Create session
    const sessionId = await createSession(companyId, email);

    logAuth('company_registered', { companyId, email: company.email });

    // Set session cookie
    const response = NextResponse.json(
      successResponse(
        {
          company: { id: companyId, name: companyName, email },
          sessionId,
        },
        'Registration successful'
      ),
      { status: 201 }
    );

    response.cookies.set('session_token', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
