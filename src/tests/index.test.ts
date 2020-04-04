import request from 'supertest';
var app = require('../index');

describe('GET / endpoint', () => {
  test('Get Welcome message', async () => {
    const result: any = await request(app).get('/');
    console.log(typeof result);
    expect(result.text).toContain('Food API');
    expect(result.statusCode).toEqual(200);
  });
});
