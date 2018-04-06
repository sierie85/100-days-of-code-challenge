const mongoose = require("mongoose");
const Movie = require("../models/Movie");

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
  const movie = await Movie.findOne({ name: req.params.movie });
  res.render("movie", { movie });
};

exports.getMovieStats = async (req, res) => {
  const stats = {};
  const movies = await Movie.find();

  const movieDuration = movies.reduce((a, b) => {
    return (a += b.runtime);
  }, 0);
  stats["avg_runtime"] = movieDuration / movies.length;

  const movieActors = movies
    .reduce((a, movie) => a.concat([...movie.actors]), [])
    .reduce((a, actor) => {
      if (actor in a) {
        a[actor]++;
      } else {
        a[actor] = 0;
      }
      return a;
    }, {});

  const topMovieActors = Object.keys(movieActors)
    .sort((a, b) => {
      return movieActors[b] - movieActors[a];
    })
    .slice(0, 3);
  stats["most_playing_actors"] = topMovieActors;

  const movieGenres = movies
    .reduce((a, movie) => a.concat([...movie.genre]), [])
    .reduce((a, genre) => {
      if (genre in a) {
        a[genre]++;
      } else {
        a[genre] = 0;
      }
      return a;
    }, {});

  const topGenre = Object.keys(movieGenres)
    .sort((a, b) => {
      return movieGenres[b] - movieGenres[a];
    })
    .slice(0, 3);
  stats["top_genre"] = topGenre;

  res.render("movie-stats", { stats });
};

exports.searchMovie = async (req, res) => {
  const query = new RegExp(`^${req.body.query}`, "i");
  const movies = await Movie.find({ name: query })
    .select("name")
    .limit(5);
  res.json(movies);
};
