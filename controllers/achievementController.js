const mongoose = require("mongoose");
const Achievement = require("../models/Achievement");
const Watched = require("../models/Watched");

exports.showAchievements = async (req, res) => {
  console.log(req.user._id);
  const watched = await Watched.findOne({ userid: req.user._id })
    .select("movie")
    .lean();
  const watchedCount = watched.movie.length;

  console.log(watched, watchedCount);

  res.render("users/user-achievements");
};

const achievements = {
  watched: {
    1: "beginner",
    10: "",
    100: "profi watcher"
  }
};

// when to update each. time controller xy in moive is trigerd - middlware for achivments
