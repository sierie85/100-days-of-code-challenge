const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });
const Movie = require('../models/Movie');

beforeAll(async () => {
  mongoose.connect(process.env.DATABASE);
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', err => { console.error('Error connecting to database', err);});
});

afterAll(async () => {
  mongoose.disconnect();
});

const sampleMovie = {
  name: 'testMovie',
  genre: [1,2,3],
  description: 'test entry',
  runtime: 180,
  rated: 12,
  released: '2000-01-01',
  poster: 'url-to-some-poster.jpg'
}

describe('Test Movieschema', function() {

  it('should create a sample movie', async () => {
    const m = new Movie(sampleMovie);
    await m.save();
    expect(m._id).toBeDefined();
  });

  it('should not be possible to create the same sample twice', async () => {
    const m = new Movie(sampleMovie);
    let error = false;
    try {
      let newMovie = await m.save();
    } catch (err){
      error = true;
    }
    expect(error).toBe(true);
  });

  it('should find the sample movie', async () => {
    const m = await Movie.findOne({name: 'testMovie'}, (err, res) => {
      if(err) return err;
      return res;
    });
    expect(m).not.toBeNull();
  });

  it('should update the sample movie', async () => {
    const m = await Movie.findOneAndUpdate(
      {name: 'testMovie'},
      {description: 'modified',},
      {new: true}
    ).exec();
    expect(m.description).toBe('modified');
  });

  it('should delete the sample movie', async () => {
    const m = await Movie.findOneAndRemove({name: 'testMovie' }, {rawResult:true}, (error, document) => {
      if(error) return error;
      return document;
    });
    if(m) {
      const m2 = await Movie.findOne({name: 'testMovie'}, (err, res) => {
        if(err) return err;
        return res;
      });
      expect(m2).toBeNull();
    }
  });

});
