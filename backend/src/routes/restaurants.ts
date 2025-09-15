import { Router, Request, Response } from 'express';

const router = Router();

// Restaurant routes placeholders
router.get('/', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'List restaurants non ancora implementato',
    endpoint: 'GET /api/restaurants'
  });
});

router.post('/', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Create restaurant non ancora implementato',
    endpoint: 'POST /api/restaurants'
  });
});

router.get('/:id', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Get restaurant by ID non ancora implementato',
    endpoint: 'GET /api/restaurants/:id'
  });
});

export default router;