require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Quote = require('../lib/models/Quote');

describe.skip('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(async() => {
    await Quote.create({ quote: 'This is a quote 1' });
    await Quote.create({ quote: 'This is a quote 2' });
    await Quote.create({ quote: 'This is a quote 3' });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  describe('Quote Tests', () =>{

    it('can create a new quote', () => {
      return request(app)
        .post('/api/v1/quotes')
        .send({ quote: 'This is a quote' })
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            quote: 'This is a quote',
            __v: 0
          });
        });
    });

    it('can get a random quote', () => {
      return request(app)
        .get('/api/v1/quotes')
        .then(res => {
          expect(res.body).toEqual({
            _id: expect.any(String),
            quote: expect.any(String),
            __v: 0
          });
        });
    });


  });
});
