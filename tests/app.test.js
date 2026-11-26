const request = require('supertest');
const app = require('../src/app');

describe('API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/items returns list', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test('POST /api/items creates item', async () => {
    const res = await request(app).post('/api/items').send({ name: 'New item' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('New item');
  });

  test('POST /api/items without name returns 400', async () => {
    const res = await request(app).post('/api/items').send({});
    expect(res.statusCode).toBe(400);
  });
});
