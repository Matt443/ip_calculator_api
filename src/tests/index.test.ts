import request from 'supertest';
import app from '@/index.js';

describe('GET /test', () => {
    it('should return Hello World', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World');
    });
});
