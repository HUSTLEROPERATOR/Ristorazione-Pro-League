import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { AuthUtils } from '../utils/auth';
import { registerSchema, loginSchema, refreshTokenSchema } from '../utils/validation';
import { RegisterRequest, LoginRequest, AuthResponse, RefreshTokenRequest } from '../types/auth';

export class AuthController {
  
  /**
   * User Registration
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validatedData = registerSchema.parse(req.body) as RegisterRequest;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          error: {
            message: 'Un utente con questa email esiste già',
            code: 'USER_ALREADY_EXISTS'
          }
        });
        return;
      }

      // Hash password
      const hashedPassword = await AuthUtils.hashPassword(validatedData.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          role: validatedData.role || 'USER'
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true
        }
      });

      // Generate tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const tokens = AuthUtils.generateTokenPair(tokenPayload);

      const response: AuthResponse = {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive
        },
        tokens
      };

      res.status(201).json({
        success: true,
        message: 'Registrazione completata con successo',
        data: response
      });

    } catch (error) {
      console.error('Registration error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({
          success: false,
          error: {
            message: 'Dati di registrazione non validi',
            code: 'VALIDATION_ERROR',
            details: error.message
          }
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante la registrazione',
          code: 'REGISTRATION_ERROR'
        }
      });
    }
  }

  /**
   * User Login
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validatedData = loginSchema.parse(req.body) as LoginRequest;

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (!user) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Email o password non corretti',
            code: 'INVALID_CREDENTIALS'
          }
        });
        return;
      }

      // Check if user is active
      if (!user.isActive) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Account disabilitato',
            code: 'ACCOUNT_DISABLED'
          }
        });
        return;
      }

      // Verify password
      const isValidPassword = await AuthUtils.comparePassword(validatedData.password, user.password);

      if (!isValidPassword) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Email o password non corretti',
            code: 'INVALID_CREDENTIALS'
          }
        });
        return;
      }

      // Generate tokens
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const tokens = AuthUtils.generateTokenPair(tokenPayload);

      const response: AuthResponse = {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive
        },
        tokens
      };

      res.status(200).json({
        success: true,
        message: 'Login effettuato con successo',
        data: response
      });

    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({
          success: false,
          error: {
            message: 'Dati di login non validi',
            code: 'VALIDATION_ERROR',
            details: error.message
          }
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il login',
          code: 'LOGIN_ERROR'
        }
      });
    }
  }

  /**
   * Refresh Token
   */
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      // Validate input
      const validatedData = refreshTokenSchema.parse(req.body) as RefreshTokenRequest;

      // Verify refresh token
      const payload = AuthUtils.verifyToken(validatedData.refreshToken);

      // Check if user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: payload.userId }
      });

      if (!user || !user.isActive) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Token di refresh non valido',
            code: 'INVALID_REFRESH_TOKEN'
          }
        });
        return;
      }

      // Generate new token pair
      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const tokens = AuthUtils.generateTokenPair(tokenPayload);

      res.status(200).json({
        success: true,
        message: 'Token rinnovato con successo',
        data: { tokens }
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      
      res.status(401).json({
        success: false,
        error: {
          message: 'Token di refresh non valido o scaduto',
          code: 'INVALID_REFRESH_TOKEN'
        }
      });
    }
  }

  /**
   * Logout (client-side token invalidation)
   */
  static async logout(_req: Request, res: Response): Promise<void> {
    res.status(200).json({
      success: true,
      message: 'Logout effettuato con successo'
    });
  }

  /**
   * Get current user profile
   */
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: {
            message: 'Autenticazione richiesta',
            code: 'AUTHENTICATION_REQUIRED'
          }
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            message: 'Utente non trovato',
            code: 'USER_NOT_FOUND'
          }
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { user }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      
      res.status(500).json({
        success: false,
        error: {
          message: 'Errore durante il recupero del profilo',
          code: 'PROFILE_ERROR'
        }
      });
    }
  }
}