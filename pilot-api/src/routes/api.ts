import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validateRequest.js';

export const apiRouter = Router();

// Example API endpoint with validation
const createItemSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
  }),
});

apiRouter.get('/items', async (req, res) => {
  // TODO: Implement database query
  res.json({
    items: [
      { id: 1, name: 'Sample Item', priority: 'high' },
    ],
    total: 1,
  });
});

apiRouter.post('/items', 
  validateRequest(createItemSchema),
  async (req, res) => {
    const { name, description, priority } = req.body;
    
    // TODO: Implement database insertion
    const newItem = {
      id: Date.now(),
      name,
      description,
      priority,
      createdAt: new Date().toISOString(),
    };
    
    res.status(201).json(newItem);
  }
);

apiRouter.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  
  // TODO: Implement database query
  res.json({
    id: parseInt(id),
    name: 'Sample Item',
    description: 'This is a sample item',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  });
});

apiRouter.delete('/items/:id', async (_req, res) => {
  // TODO: Implement database deletion
  res.status(204).send();
});