import { Request, Response, NextFunction } from 'express';
import { AuthUtils } from '../utils/auth';
import { TokenPayload } from '../types/auth';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'] as string;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Token di accesso mancante',
          code: 'MISSING_TOKEN'
        }
      });
      return;
    }

    const payload = AuthUtils.verifyToken(token);
    req.user = payload;
    next();

  } catch (error) {
    let message = 'Token non valido';
    let code = 'INVALID_TOKEN';

    if (error instanceof Error) {
      if (error.message === 'Token expired') {
        message = 'Token scaduto';
        code = 'TOKEN_EXPIRED';
      } else if (error.message === 'Invalid token') {
        message = 'Token non valido';
        code = 'INVALID_TOKEN';
      }
    }

    res.status(401).json({
      success: false,
      error: {
        message,
        code
      }
    });
    return;
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
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

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: {
          message: 'Permessi insufficienti',
          code: 'INSUFFICIENT_PERMISSIONS'
        }
      });
      return;
    }

    next();
  };
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'] as string;
    const token = AuthUtils.extractTokenFromHeader(authHeader);

    if (token) {
      const payload = AuthUtils.verifyToken(token);
      req.user = payload;
    }

    next();
  } catch (error) {
    // For optional auth, we continue even if token is invalid
    next();
  }
};