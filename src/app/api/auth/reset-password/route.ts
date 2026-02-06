// src/app/api/auth/reset-password/route.ts
// POST /api/auth/reset-password - Confirm password reset

import { NextRequest, NextResponse } from 'next/server';
import { verifyPasswordResetToken, usePasswordResetToken, resetPassword } from '@/lib/auth';
import { validateInput, resetPasswordSchema } from '@/lib/validation';
import { handleError, successResponse } from '@/lib/errors';
import { logAuth } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = await validateInput(resetPasswordSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', details: validation.errors },
        },
        { status: 400 }
      );
    }

    const { token, password } = validation.data;

    // Verify token
    const companyId = await verifyPasswordResetToken(token);
    if (!companyId) {
      logAuth('password_reset_invalid_token', { token: token.substring(0, 10) + '...' });
      return NextResponse.json(
        {
          success: false,
          error: { code: 'AUTHENTICATION_ERROR', message: 'Invalid or expired reset token' },
        },
        { status: 401 }
      );
    }

    // Reset password
    await resetPassword(companyId, password);
    await usePasswordResetToken(token);

    logAuth('password_reset_successful', { companyId });

    return NextResponse.json(
      successResponse({}, 'Password reset successful. Please log in with your new password.'),
      { status: 200 }
    );
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
