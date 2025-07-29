import { Router } from 'express';
import { Pool } from 'pg';
import { config } from '../config/config.js';

export const healthRouter = Router();

const pool = new Pool({
  connectionString: config.databaseUrl,
});

healthRouter.get('/', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
  };

  res.json(health);
});

healthRouter.get('/ready', async (req, res) => {
  try {
    // Check database connection
    await pool.query('SELECT 1');
    
    res.json({
      status: 'ready',
      services: {
        database: 'connected',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      services: {
        database: 'disconnected',
      },
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});