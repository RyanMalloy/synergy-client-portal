// src/lib/errors.ts
// Custom error classes and error handling

import { logger } from './logger';

/**
 * Base API error
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string = 'INTERNAL_ERROR',
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Validation error
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, string>) {
    super(400, message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(401, message, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends ApiError {
  constructor(message: string = 'Access denied') {
    super(403, message, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

/**
 * Not found error
 */
export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(404, `${resource} not found`, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict error (e.g., duplicate resource)
 */
export class ConflictError extends ApiError {
  constructor(message: string = 'Resource already exists') {
    super(409, message, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends ApiError {
  constructor(retryAfter: number = 60) {
    super(429, 'Too many requests', 'RATE_LIMIT', { retryAfter });
    this.name = 'RateLimitError';
  }
}

/**
 * Internal server error
 */
export class InternalError extends ApiError {
  constructor(message: string = 'Internal server error', details?: any) {
    super(500, message, 'INTERNAL_ERROR', details);
    this.name = 'InternalError';
  }
}

/**
 * Handle async errors in API routes
 */
export function handleError(error: unknown): { statusCode: number; body: any } {
  // Log the error
  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      logger.error(`API Error: ${error.code}`, { error });
    }
    return {
      statusCode: error.statusCode,
      body: {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          ...(error.details && { details: error.details }),
        },
      },
    };
  }

  if (error instanceof Error) {
    logger.error('Unexpected error', { error: error.message, stack: error.stack });
  } else {
    logger.error('Unexpected error', { error });
  }

  return {
    statusCode: 500,
    body: {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    },
  };
}

/**
 * Success response wrapper
 */
export function successResponse<T>(
  data: T,
  message: string = 'Success'
): { success: true; message: string; data: T } {
  return {
    success: true,
    message,
    data,
  };
}
