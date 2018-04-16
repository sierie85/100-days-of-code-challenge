const mongoose = require("mongoose");
const Movie = require("../models/Movie");

exports.searchMovie = async (req, res) => {
  const query = new RegExp(`^${req.body.query}`, "i");
  const movies = await Movie.find({ name: query })
    .select("name")
    .limit(5);
  const actors = await Movie.find({ actors: query }).limit(5);

  res.json({ movies, actors });
};
