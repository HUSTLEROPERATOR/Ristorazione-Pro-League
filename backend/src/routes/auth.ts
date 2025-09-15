import { Router } from 'express';
// import { AuthController } from '../controllers/authController';
import { SimpleAuthController } from '../controllers/simpleAuthController';
// import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes (using simple controller for testing)
router.post('/register', SimpleAuthController.register);
router.post('/login', SimpleAuthController.login);

// Placeholder routes
router.post('/refresh', (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Refresh token non ancora implementato',
    endpoint: 'POST /api/auth/refresh'
  });
});

router.post('/logout', (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Logout non ancora implementato',  
    endpoint: 'POST /api/auth/logout'
  });
});

router.get('/profile', (_req, res) => {
  res.status(501).json({
    success: false,
    message: 'Profile non ancora implementato',
    endpoint: 'GET /api/auth/profile'
  });
});

export default router;