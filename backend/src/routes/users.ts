import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

// User profile routes
router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);

// Admin only routes
router.get('/', authorizeRoles('ADMIN', 'MODERATOR'), UserController.listUsers);
router.get('/:id', authorizeRoles('ADMIN', 'MODERATOR'), UserController.getUserById);
router.patch('/:id/status', authorizeRoles('ADMIN'), UserController.updateUserStatus);

export default router;