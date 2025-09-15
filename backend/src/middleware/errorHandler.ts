import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Errore interno del server';

  // Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    if (error.code === 'P2002') {
      statusCode = 409;
      message = 'Risorsa già esistente';
    } else if (error.code === 'P2025') {
      statusCode = 404;
      message = 'Risorsa non trovata';
    }
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token non valido';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token scaduto';
  }

  // Validation errors
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Dati non validi';
  }

  // Log error in development
  if (process.env['NODE_ENV'] === 'development') {
    console.error('Error:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: error.code || 'UNKNOWN_ERROR',
      ...(process.env['NODE_ENV'] === 'development' && {
        stack: error.stack,
        details: error
      })
    }
  });
};