// src/middleware.ts
// Next.js middleware for auth and request validation

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { logger } from '@/lib/logger';

const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password', '/pricing', '/services', '/how-it-works', '/api/auth'];
const PROTECTED_PATHS = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static assets and _next
  if (pathname.startsWith('/_next') || pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  // Get session token from cookie
  const token = request.cookies.get('session_token')?.value;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (isProtectedRoute) {
    if (!token) {
      logger.info('Unauthorized access attempt', { pathname });
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify session
    const session = await getSession(token);
    if (!session) {
      logger.info('Invalid or expired session', { pathname });
      // Clear cookie
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session_token');
      return response;
    }

    // Add company ID to request headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-company-id', session.companyId);
    requestHeaders.set('x-session-expires-at', session.expiresAt.toISOString());

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect authenticated users away from auth pages
  if (token && ['/login', '/signup', '/forgot-password'].includes(pathname)) {
    const session = await getSession(token);
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|public|api/webhooks).*)',
  ],
};
