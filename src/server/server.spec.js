import request from 'supertest';
import app from './server';

describe('travelInfo', () => {
    it('should return a 200', async () => {
    const response = await request(app).post('/travelInfo').send({city: 'Berlin', date: '2020-07-06'});
    expect(response.statusCode).toBe(200);
    });
});