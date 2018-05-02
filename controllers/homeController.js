const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const Watched = require("../models/Watched");
const Blog = require("../models/Blog");

exports.getContent = async (req, res) => {
  const newestMovies = await Movie.find()
    .sort({ released: -1 })
    .limit(4);

  const bestRatedMovies = await Movie.find()
    .sort({ imdbRating: -1 })
    .limit(4);

  const watched = await Watched.find().select({ movie: 1, _id: 0 });
  const mostWatchedSum = watched
    .reduce((arr, item) => arr.concat(item.movie), [])
    .reduce((obj, item) => {
      if (item in obj) {
        obj[item]++;
      } else {
        obj[item] = 1;
      }
      return obj;
    }, {});

  const mostWatchedSorted = Object.keys(mostWatchedSum)
    .sort((a, b) => {
      return mostWatchedSum[b] - mostWatchedSum[a];
    })
    .slice(0, 4);

  const mostWatched = await Movie.find({
    _id: { $in: mostWatchedSorted }
  });

  const posts = await Blog.find({})
    .select({ title: 1, author: 1, created: 1, _id: 0 })
    .populate("author", ["name"])
    .sort({ created: -1 })
    .limit(4);

  res.render("index", { newestMovies, bestRatedMovies, mostWatched, posts });
};
