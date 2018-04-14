const mongoose = require("mongoose");
const Watchlist = require("../models/Watchlist");
const Watched = require("../models/Watched");
const Favorite = require("../models/Favorite");

const getSchema = schema => {
  switch (schema) {
    case "watched":
      return Watched;
      break;
    case "watchlist":
      return Watchlist;
      break;
    case "favorite":
      return Favorite;
    default:
      return false;
      break;
  }
};

exports.getlist = async (req, res) => {
  const schema = getSchema(req.params.schema);
  const list = await schema
    .find({ userid: req.user._id })
    .populate("movie", ["name", "imdbRating", "poster"]);

  res.render("users/user-list", { list, schema: req.params.schema });
};

exports.updateUserList = async (req, res) => {
  let state = "off";
  const schema = getSchema(req.body.schema);
  const exists = await schema.findOne({ userid: req.user._id });

  if (exists) {
    if (exists.movie.indexOf(req.body.movieid) !== -1) {
      await schema.findOneAndUpdate(
        { userid: req.user._id },
        { $pull: { movie: req.body.movieid } },
        { new: true, upsert: true }
      );
      state = "off";
    } else {
      await schema.findOneAndUpdate(
        { userid: req.user._id },
        { $addToSet: { movie: req.body.movieid } },
        { new: true, upsert: true }
      );
      state = "on";
    }
  } else {
    await new schema({
      userid: req.user._id,
      movie: [req.body.movieid]
    }).save();
    state = "on";
  }

  res.json({ state });
};
