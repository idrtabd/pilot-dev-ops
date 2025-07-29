import request from 'supertest';
import express from 'express';
import { apiRouter } from '../src/routes/api';
import { errorHandler } from '../src/middleware/errorHandler';

describe('API Routes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api', apiRouter);
    app.use(errorHandler);
  });

  describe('GET /api/items', () => {
    it('should return list of items', async () => {
      const response = await request(app)
        .get('/api/items')
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.items)).toBe(true);
    });
  });

  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const newItem = {
        name: 'Test Item',
        description: 'Test Description',
        priority: 'high',
      };

      const response = await request(app)
        .post('/api/items')
        .send(newItem)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        name: newItem.name,
        description: newItem.description,
        priority: newItem.priority,
        createdAt: expect.any(String),
      });
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({})
        .expect(400);

      expect(response.body.error).toHaveProperty('message', 'Validation Error');
    });
  });

  describe('GET /api/items/:id', () => {
    it('should return a single item', async () => {
      const response = await request(app)
        .get('/api/items/123')
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('priority');
    });
  });

  describe('DELETE /api/items/:id', () => {
    it('should delete an item', async () => {
      await request(app)
        .delete('/api/items/123')
        .expect(204);
    });
  });
});