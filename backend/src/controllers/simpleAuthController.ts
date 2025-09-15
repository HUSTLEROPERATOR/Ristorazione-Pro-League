import { Request, Response } from 'express';

export class SimpleAuthController {
  
  static async register(req: Request, res: Response): Promise<void> {
    try {
      console.log('📝 Registration attempt:', req.body);
      
      // For now, just return success to test the endpoint
      res.status(201).json({
        success: true,
        message: 'Test registration endpoint working',
        data: {
          user: {
            id: 'test-id',
            email: req.body.email || 'test@test.com',
            firstName: req.body.firstName || 'Test',
            lastName: req.body.lastName || 'User'
          }
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Registration test error',
          code: 'TEST_ERROR'
        }
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      console.log('🔐 Login attempt:', req.body);
      
      res.status(200).json({
        success: true,
        message: 'Test login endpoint working',
        data: {
          user: {
            id: 'test-id',
            email: req.body.email || 'test@test.com'
          },
          tokens: {
            accessToken: 'test-access-token',
            refreshToken: 'test-refresh-token'
          }
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: 'Login test error',
          code: 'TEST_ERROR'
        }
      });
    }
  }
}