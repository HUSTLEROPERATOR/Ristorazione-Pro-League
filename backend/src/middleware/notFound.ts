import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint non trovato: ${req.method} ${req.path}`,
      code: 'NOT_FOUND'
    }
  });
};