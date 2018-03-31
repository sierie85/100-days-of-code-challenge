const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => { console.error('Error connecting to database', err);});
const Movie = require('../models/Movie');
const movies = require('./movies.json');

// fill database with movies
const loadData = async () => {
  await Movie.remove();
  try {
    await Movie.insertMany(movies);
    console.log('data loaded');
  } catch(err) {
    console.log(err);
  }
  process.exit();
}
loadData();
