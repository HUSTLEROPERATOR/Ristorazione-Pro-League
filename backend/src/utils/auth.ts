import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { TokenPayload } from '../types/auth';

export class AuthUtils {
  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, config.bcryptRounds);
  }

  /**
   * Compare password with hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT access token
   */
  static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload as any, config.jwtSecret as any, {
      expiresIn: '15m', // Short-lived access token
      issuer: 'rpl-backend',
      audience: 'rpl-frontend'
    } as any);
  }

  /**
   * Generate JWT refresh token
   */
  static generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload as any, config.jwtSecret as any, {
      expiresIn: config.jwtExpiresIn as string, // Long-lived refresh token
      issuer: 'rpl-backend',
      audience: 'rpl-frontend'
    } as any);
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, config.jwtSecret, {
        issuer: 'rpl-backend',
        audience: 'rpl-frontend'
      }) as TokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw new Error('Token verification failed');
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }

  /**
   * Generate token pair (access + refresh)
   */
  static generateTokenPair(payload: TokenPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('La password deve essere di almeno 8 caratteri');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('La password deve contenere almeno una lettera maiuscola');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('La password deve contenere almeno una lettera minuscola');
    }
    if (!/\d/.test(password)) {
      errors.push('La password deve contenere almeno un numero');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('La password deve contenere almeno un carattere speciale');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}