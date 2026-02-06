// src/lib/logger.ts
// Structured logging with pino

import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || (isDev ? 'debug' : 'info'),
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  isDev ? pino.transport({ target: 'pino-pretty' }) : undefined
);

/**
 * Log authentication events
 */
export function logAuth(event: string, data: any) {
  logger.info({ event: `auth.${event}`, ...data }, `Auth: ${event}`);
}

/**
 * Log payment events
 */
export function logPayment(event: string, data: any) {
  logger.info({ event: `payment.${event}`, ...data }, `Payment: ${event}`);
}

/**
 * Log subscription events
 */
export function logSubscription(event: string, data: any) {
  logger.info({ event: `subscription.${event}`, ...data }, `Subscription: ${event}`);
}

/**
 * Log audit trail
 */
export function logAudit(action: string, resourceType: string, resourceId: string, data?: any) {
  logger.info(
    { event: 'audit', action, resourceType, resourceId, ...data },
    `Audit: ${action} on ${resourceType} ${resourceId}`
  );
}

export default logger;
