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
  const page = req.params.page || 1;
  const limit = 24;
  const skip = page * limit - limit;

  const movies = await Movie.find(req.query)
    .sort({ imdbRating: -1 })
    .skip(skip)
    .limit(limit);

  const max = await Movie.find(req.query).count();
  const pages = Math.ceil(max / limit);
  const query = req.query;

  res.render("movies", { movies, page, pages, query });
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
