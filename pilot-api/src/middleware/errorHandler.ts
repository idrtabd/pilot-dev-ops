import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config/config.js';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors: any = undefined;

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  }

  // Log error details in non-production environments
  if (!config.isProduction) {
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      statusCode,
      url: req.url,
      method: req.method,
      body: req.body,
    });
  }

  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      ...(errors && { errors }),
      ...(config.isDevelopment && { stack: err.stack }),
    },
    timestamp: new Date().toISOString(),
  });
};