const mongoose = require("mongoose");
const Watchlist = require("../models/Watchlist");

exports.getWatchlist = async (req, res) => {
  const watchlist = await Watchlist.find({ userid: req.user._id }).populate(
    "movie",
    ["name", "imdbRating"]
  );
  res.render("watchlist", { watchlist });
};

exports.deleteFromWatchlist = async (req, res) => {
  const watchlist = await Watchlist.findOne({ userid: req.user._id });
  await Watchlist.findOneAndUpdate(
    { userid: req.user._id },
    { $pull: { movie: req.body.movieid } },
    { new: true, upsert: true }
  );
  res.redirect("/watchlist");
};

exports.updateWatchlist = async (req, res) => {
  const watchlist = await Watchlist.findOne({ userid: req.user._id });
  let state = "off";
  if (watchlist) {
    if (watchlist.movie.indexOf(req.body.movieid) !== -1) {
      await Watchlist.findOneAndUpdate(
        { userid: req.user._id },
        { $pull: { movie: req.body.movieid } },
        { new: true, upsert: true }
      );
      state = "off";
    } else {
      await Watchlist.findOneAndUpdate(
        { userid: req.user._id },
        { $addToSet: { movie: req.body.movieid } },
        { new: true, upsert: true }
      );
      state = "on";
    }
  } else {
    await new Watchlist({
      userid: req.user._id,
      movie: [req.body.movieid]
    }).save();
    state = "on";
  }
  res.json({ state });
};
