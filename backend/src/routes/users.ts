import { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

// Get user profile
router.get('/profile', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Get user profile non ancora implementato',
    endpoint: 'GET /api/users/profile'
  });
});

// Update user profile
router.put('/profile', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Update user profile non ancora implementato',
    endpoint: 'PUT /api/users/profile'
  });
});

// Admin only routes
router.get('/', authorizeRoles('ADMIN', 'MODERATOR'), (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'List all users non ancora implementato',
    endpoint: 'GET /api/users'
  });
});

export default router;