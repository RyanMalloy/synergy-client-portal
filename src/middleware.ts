// src/middleware.ts
// Next.js middleware for auth and request validation
// Uses JWT verification only (Edge-compatible, no database calls)

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key');

const PROTECTED_PATHS = ['/dashboard'];
const AUTH_PAGES = ['/login', '/signup', '/forgot-password'];

interface JWTPayload {
  companyId: string;
  email: string;
}

async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static assets and _next
  if (pathname.startsWith('/_next') || pathname.startsWith('/public') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Get JWT token from cookie
  const token = request.cookies.get('auth_token')?.value;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Verify JWT
    const payload = await verifyToken(token);
    if (!payload) {
      // Invalid token - clear cookie and redirect
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }

    // Add company ID to request headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-company-id', payload.companyId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Redirect authenticated users away from auth pages
  if (token && AUTH_PAGES.includes(pathname)) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|public|api).*)',
  ],
};
