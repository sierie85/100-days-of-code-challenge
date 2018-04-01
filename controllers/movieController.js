const mongoose = require('mongoose');
const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
  const movie = await new Movie(req.body).save();
  res.redirect('/movies');
}

exports.getMovies = async (req, res) => {
  const movies = await Movie.find().sort({imdbRating: -1}).limit(24);
  res.render('movies', {movies});
}

exports.addMovie = (req, res) => {
  res.render('add-movie');
}

exports.getMovie = async (req, res) => {
  const movie = await Movie.findOne({name: req.params.movie});
  res.render('movie', {movie});
}
