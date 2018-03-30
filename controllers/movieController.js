const mongoose = require('mongoose');
const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
  const movie = await new Movie(req.body).save();
  res.redirect('/movies');
}

exports.getMovies = async (req, res) => {
  const movies = await Movie.find().limit(12);
  res.render('movies', {movies});
}

exports.addMovie = (req, res) => {
  res.render('add-movie');
}

