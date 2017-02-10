'use strict';

var request = require('supertest')
  , app     = require('../app');

describe('Get', () => {
  it('Returns 200 status code', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });

  it('Returns a JOSN format', (done) => {
    request(app)
      .get('/')
      .expect('Content-type', /json/, done);
  });
});
