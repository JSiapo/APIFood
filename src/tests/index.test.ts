// import request from "supertest";
const request = require('supertest');

const requests = request('https://apihomefood.herokuapp.com/');

describe('GET /random-url', () => {
  it('should return 404', done => {
    requests.get('/reset').expect(404, done);
  });
});
