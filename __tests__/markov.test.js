require('dotenv').config();
const createNewMarkov = require('../lib/utils/createNewMarkov');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');


describe.skip('Markov Function test', () => {

  beforeAll(() => {
    connect();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can generate a sentence pulling from data', async() => {
    const markov = await createNewMarkov();

    expect(markov).toEqual(expect.any(String));
  });
});
