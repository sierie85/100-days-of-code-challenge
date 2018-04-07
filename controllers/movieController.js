const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Watchlist = require("../models/Watchlist");
const moment = require("moment");

exports.createMovie = async (req, res) => {
  if (req.user.role !== "admin") {
    res.redirect("/");
    return;
  }
  const movie = await new Movie(req.body).save();
  res.redirect("/movies");
};

exports.getMovies = async (req, res) => {
  const movies = await Movie.find()
    .sort({ imdbRating: -1 })
    .limit(24);
  res.render("movies", { movies });
};

exports.addMovie = (req, res) => {
  res.render("add-movie");
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findOne({ name: req.params.movie }).lean();
  movie.released = moment(movie.released).format("MMMM Do YYYY");
  let onWatchlist = false;
  if (req.user) {
    const watchlist = await Watchlist.findOne({ userid: req.user._id });
    if (watchlist && watchlist.movie.indexOf(movie._id) !== -1) {
      onWatchlist = true;
    }
  }
  res.render("movie", { movie, onWatchlist });
};
