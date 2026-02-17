import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurantController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', optionalAuth, RestaurantController.list);
router.get('/:id', optionalAuth, RestaurantController.getById);

// Protected routes
router.post('/', authenticateToken, RestaurantController.create);
router.put('/:id', authenticateToken, RestaurantController.update);
router.delete('/:id', authenticateToken, RestaurantController.delete);

export default router;