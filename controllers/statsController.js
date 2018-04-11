const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Watched = require("../models/Watched");

const averageFromPropArray = (modelResults, prop) => {
  const upsummedProp = modelResults
    .reduce((a, res) => a.concat([...res[prop]]), [])
    .reduce((a, prop) => {
      if (prop in a) {
        a[prop]++;
      } else {
        a[prop] = 0;
      }
      return a;
    }, {});

  const sortedProp = Object.keys(upsummedProp).sort((a, b) => {
    return upsummedProp[b] - upsummedProp[a];
  });

  return sortedProp;
};

const averageFromProp = (modelResults, prop) => {
  const average = modelResults.reduce((a, b) => {
    return (a += b[prop]);
  }, 0);
  return average / modelResults.length;
};

exports.getMovieStats = async (req, res) => {
  const stats = {};
  const movies = await Movie.find();
  const watched = await Watched.find();

  stats["avg_runtime"] = averageFromProp(movies, "runtime");
  stats["most_playing_actors"] = averageFromPropArray(movies, "actors").slice(
    0,
    5
  );
  stats["top_genre"] = averageFromPropArray(movies, "genre").slice(0, 3);

  stats["most_watched"] = averageFromPropArray(watched, "movie").slice(0, 3);

  res.render("movie-stats", { stats });
};
