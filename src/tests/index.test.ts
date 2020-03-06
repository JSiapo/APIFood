// import request from "supertest";
const request = require('supertest');

const requests = request('http://localhost:3001');

describe('GET /random-url', () => {
  it('should return 404', done => {
    requests.get('/reset').expect(404, done);
  });
});
