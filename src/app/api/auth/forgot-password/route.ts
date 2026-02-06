// src/app/api/auth/forgot-password/route.ts
// POST /api/auth/forgot-password - Request password reset

import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { createPasswordResetToken } from '@/lib/auth';
import { validateInput, resetPasswordRequestSchema } from '@/lib/validation';
import { handleError, successResponse } from '@/lib/errors';
import { logAuth } from '@/lib/logger';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = await validateInput(resetPasswordRequestSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Find company
    const company = await queryOne<{ id: string; name: string }>(
      'SELECT id, name FROM companies WHERE email = $1',
      [email]
    );

    // Don't reveal if email exists (security)
    if (!company) {
      logAuth('forgot_password_not_found', { email });
      return NextResponse.json(
        successResponse({}, 'If this email is registered, you will receive a password reset link'),
        { status: 200 }
      );
    }

    // Create reset token
    const resetToken = await createPasswordResetToken(company.id);

    // TODO: Send email with reset link
    // const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    // await sendEmail(email, 'Password Reset Request', resetLink);

    logger.info('Password reset token created - TODO: send email', {
      companyId: company.id,
      email,
      resetToken: resetToken.substring(0, 10) + '...',
    });

    logAuth('password_reset_requested', { companyId: company.id, email });

    return NextResponse.json(
      successResponse({}, 'If this email is registered, you will receive a password reset link'),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
