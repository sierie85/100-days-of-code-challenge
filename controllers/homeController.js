const mongoose = require("mongoose");
const Movie = require("../models/Movie");

exports.getContent = async (req, res) => {
  const newestMovies = await Movie.find()
    .sort({ released: -1 })
    .limit(4);
  const bestRatedMovies = await Movie.find()
    .sort({ imdbRating: -1 })
    .limit(4);
  res.render("index", { newestMovies, bestRatedMovies });
};
