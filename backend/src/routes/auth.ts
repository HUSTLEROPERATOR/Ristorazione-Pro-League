import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { SimpleAuthController } from '../controllers/simpleAuthController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Use full AuthController for production, SimpleAuthController for testing
const USE_SIMPLE_AUTH = process.env['USE_SIMPLE_AUTH'] === 'true';

// Public routes
if (USE_SIMPLE_AUTH) {
  router.post('/register', SimpleAuthController.register);
  router.post('/login', SimpleAuthController.login);
} else {
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
}

// Token management
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

// Protected routes
router.get('/profile', authenticateToken, AuthController.getProfile);

export default router;