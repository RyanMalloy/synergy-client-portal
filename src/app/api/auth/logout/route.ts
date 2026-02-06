// src/app/api/auth/logout/route.ts
// POST /api/auth/logout - User logout

import { NextRequest, NextResponse } from 'next/server';
import { invalidateSession } from '@/lib/auth';
import { handleError, successResponse } from '@/lib/errors';
import { logAuth } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('session_token')?.value;

    if (token) {
      await invalidateSession(token);
      const companyId = request.headers.get('x-company-id');
      logAuth('logout', { companyId });
    }

    const response = NextResponse.json(
      successResponse({}, 'Logged out successfully')
    );

    response.cookies.delete('session_token');
    return response;
  } catch (error) {
    const { statusCode, body } = handleError(error);
    return NextResponse.json(body, { status: statusCode });
  }
}
