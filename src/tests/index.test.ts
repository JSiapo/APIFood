import request from 'supertest';

const requests = request('https://apihomefood.herokuapp.com/');

describe('GET random-url', () => {
  it('should return 403', done => {
    requests.get('/reset').expect(403, done);
  });
});
