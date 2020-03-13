import request from 'supertest';
// import app from '../index';
jest.mock('express', () => {
  return require('jest-express');
});

const requests = request('https://apihomefood.herokuapp.com');

describe('GET random-url', () => {
  it('should return 403', done => {
    requests.get('/reset').expect(403, done);
  });
});
