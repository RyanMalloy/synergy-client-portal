// src/lib/auth.ts
// Authentication utilities: bcrypt, JWT, session management

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { query, queryOne, transaction } from './db';
import { logger, logAuth } from './logger';

const BCRYPT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface SessionPayload {
  companyId: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/**
 * Verify a password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a secure random token
 */
export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Create JWT token
 */
export function createJWT(payload: Omit<SessionPayload, 'iat' | 'exp'>, expiresIn: string = '24h'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify JWT token
 */
export function verifyJWT(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Create a session for a company
 */
export async function createSession(companyId: string, email: string): Promise<string> {
  const sessionId = generateToken(16);
  const token = createJWT({ companyId, email });
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  try {
    await query(
      `INSERT INTO sessions (id, company_id, token, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [sessionId, companyId, token, expiresAt]
    );

    logAuth('session_created', { companyId, expiresAt });
    return sessionId;
  } catch (error) {
    logger.error('Failed to create session', { companyId, error });
    throw error;
  }
}

/**
 * Get session by token
 */
export async function getSession(token: string): Promise<{ companyId: string; expiresAt: Date } | null> {
  const session = await queryOne<{ company_id: string; expires_at: Date }>(
    `SELECT company_id, expires_at FROM sessions WHERE token = $1`,
    [token]
  );

  if (!session) return null;

  // Check expiration
  if (new Date(session.expires_at) < new Date()) {
    // Session expired
    await query('DELETE FROM sessions WHERE token = $1', [token]);
    return null;
  }

  return { companyId: session.company_id, expiresAt: session.expires_at };
}

/**
 * Extend session expiration
 */
export async function extendSession(token: string): Promise<boolean> {
  const newExpiresAt = new Date(Date.now() + SESSION_DURATION);
  try {
    const result = await query(
      `UPDATE sessions SET expires_at = $1 WHERE token = $2`,
      [newExpiresAt, token]
    );
    return result.rowCount! > 0;
  } catch (error) {
    logger.error('Failed to extend session', error);
    return false;
  }
}

/**
 * Invalidate session
 */
export async function invalidateSession(token: string): Promise<boolean> {
  try {
    const result = await query(`DELETE FROM sessions WHERE token = $1`, [token]);
    return result.rowCount! > 0;
  } catch (error) {
    logger.error('Failed to invalidate session', error);
    return false;
  }
}

/**
 * Invalidate all sessions for a company
 */
export async function invalidateAllSessions(companyId: string): Promise<number> {
  try {
    const result = await query(`DELETE FROM sessions WHERE company_id = $1`, [companyId]);
    logAuth('all_sessions_invalidated', { companyId });
    return result.rowCount!;
  } catch (error) {
    logger.error('Failed to invalidate all sessions', { companyId, error });
    throw error;
  }
}

/**
 * Create password reset token
 */
export async function createPasswordResetToken(companyId: string): Promise<string> {
  const token = generateToken(32);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  try {
    await query(
      `INSERT INTO password_reset_tokens (company_id, token, expires_at)
       VALUES ($1, $2, $3)`,
      [companyId, token, expiresAt]
    );

    logAuth('password_reset_token_created', { companyId });
    return token;
  } catch (error) {
    logger.error('Failed to create password reset token', { companyId, error });
    throw error;
  }
}

/**
 * Verify password reset token and get company
 */
export async function verifyPasswordResetToken(token: string): Promise<string | null> {
  const resetToken = await queryOne<{ company_id: string; expires_at: Date }>(
    `SELECT company_id, expires_at FROM password_reset_tokens WHERE token = $1`,
    [token]
  );

  if (!resetToken) return null;

  // Check expiration
  if (new Date(resetToken.expires_at) < new Date()) {
    return null;
  }

  return resetToken.company_id;
}

/**
 * Use password reset token (invalidate after use)
 */
export async function usePasswordResetToken(token: string): Promise<void> {
  await query(`DELETE FROM password_reset_tokens WHERE token = $1`, [token]);
}

/**
 * Hash and store password reset in transaction
 */
export async function resetPassword(companyId: string, newPassword: string): Promise<void> {
  const passwordHash = await hashPassword(newPassword);

  await transaction(async (client) => {
    // Update password
    await client.query(
      `UPDATE companies SET password_hash = $1 WHERE id = $2`,
      [passwordHash, companyId]
    );

    // Invalidate all sessions
    await client.query(`DELETE FROM sessions WHERE company_id = $1`, [companyId]);

    logAuth('password_reset', { companyId });
  });
}
