import { Router, Request, Response } from 'express';

const router = Router();

// Worker routes placeholders
router.get('/profile', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Get worker profile non ancora implementato',
    endpoint: 'GET /api/workers/profile'
  });
});

router.put('/profile', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'Update worker profile non ancora implementato',
    endpoint: 'PUT /api/workers/profile'
  });
});

router.get('/jobs', (_req: Request, res: Response) => {
  res.status(501).json({
    success: false,
    message: 'List available jobs non ancora implementato',
    endpoint: 'GET /api/workers/jobs'
  });
});

export default router;