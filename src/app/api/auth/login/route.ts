// src/app/api/auth/login/route.ts
// POST /api/auth/login - User login

import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { verifyPassword, createSession } from '@/lib/auth';
import { validateInput, loginSchema } from '@/lib/validation';
import { handleError, successResponse } from '@/lib/errors';
import { logAuth } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = await validateInput(loginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Find company
    const company = await queryOne<{
      id: string;
      email: string;
      password_hash: string;
      name: string;
    }>(
      'SELECT id, email, password_hash, name FROM companies WHERE email = $1',
      [email]
    );

    if (!company) {
      logAuth('login_failed', { email, reason: 'user_not_found' });
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTHENTICATION_ERROR', message: 'Invalid email or password' },
        },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, company.password_hash);
    if (!isValid) {
      logAuth('login_failed', { email, reason: 'invalid_password' });
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTHENTICATION_ERROR', message: 'Invalid email or password' },
        },
        { status: 401 }
      );
    }

    // Create session
    const sessionId = await createSession(company.id, company.email);

    logAuth('login_successful', { companyId: company.id, email: company.email });

    const response = NextResponse.json(
      successResponse(
        {
          company: { id: company.id, name: company.name, email: company.email },
          sessionId,
        },
        'Login successful'
      ),
      { status: 200 }
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
