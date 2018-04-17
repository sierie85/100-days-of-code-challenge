const mongoose = require("mongoose");
const Movie = require("../models/Movie");

exports.searchMovie = async (req, res) => {
  const query = new RegExp(`^${req.body.query}`, "i");
  const movies = await Movie.find({ name: query })
    .select("name")
    .limit(3);

  const moviesArray = movies.map(movie => movie.name);

  const actors = await Movie.find({ actors: query }, { "actors.$": 1 })
    .select("actors")
    .limit(3);

  const uniqueActors = actors.reduce((actors, actor) => {
    if (false === actors.includes(actor.actors[0])) {
      actors.push(actor.actors[0]);
    }
    return actors;
  }, []);

  res.json({ movies: moviesArray, actors: uniqueActors });
};
