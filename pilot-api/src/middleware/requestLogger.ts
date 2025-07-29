import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log response after it's sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      timestamp: new Date().toISOString(),
    };

    if (config.logLevel === 'debug') {
      console.log(JSON.stringify(logData, null, 2));
    } else {
      console.log(`${logData.method} ${logData.url} ${logData.status} ${logData.duration}`);
    }
  });

  next();
};