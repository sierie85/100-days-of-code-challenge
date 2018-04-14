const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Watchlist = require("../models/Watchlist");
const Watched = require("../models/Watched");
const Favorite = require("../models/Favorite");
const Review = require("../models/Review");
const moment = require("moment");

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

  res.render("movies/movie-overview", { movies, page, pages, query });
};

exports.getMovie = async (req, res) => {
  const movie = await Movie.findOne({ name: req.params.movie }).lean();
  movie.released = moment(movie.released).format("MMMM Do YYYY");

  let onWatchlist = false;
  let onWatchedlist = false;
  let onFavoritelist = false;
  let userReview = false;

  if (req.user) {
    const [watchlist, watchedlist, favoritelist] = await Promise.all([
      await Watchlist.findOne({ userid: req.user._id, movie: movie._id }),
      await Watched.findOne({ userid: req.user._id, movie: movie._id }),
      await Favorite.findOne({ userid: req.user._id, movie: movie._id })
    ]);

    onWatchlist = watchlist ? true : false;
    onWatchedlist = watchedlist ? true : false;
    onFavoritelist = favoritelist ? true : false;

    const review = await Review.findOne({
      user: req.user._id,
      movie: movie._id
    });
    userReview = review ? true : false;
  }

  const reviews = await Review.find({ movie: movie._id })
    .populate("user", ["name", "email"])
    .sort({ created: -1 });

  const avgRating = await Review.getAvgRating(movie._id);

  res.render("movies/movie-single", {
    movie,
    onWatchlist,
    onWatchedlist,
    onFavoritelist,
    userReview,
    reviews,
    avgRating
  });
};

exports.addMovie = (req, res) => {
  res.render("backend/add-movie");
};

exports.createMovie = async (req, res) => {
  if (req.user.role !== "admin") {
    res.redirect("/");
    return;
  }
  const movie = await new Movie(req.body).save();
  res.redirect("/movies");
};
