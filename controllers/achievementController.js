const mongoose = require("mongoose");
const Achievement = require("../models/Achievement");
const Watched = require("../models/Watched");

exports.showAchievements = async (req, res) => {
  console.log(req.user._id);
  const watched = await Watched.findOne({ userid: req.user._id })
    .select("movie")
    .lean();
  const watchedCount = watched.movie.length;
  const watchedAchievements = checkForAchievement(
    achievements.watched,
    watchedCount
  );
  console.log(checkForAchievement(achievements.watched, watchedCount));

  res.render("users/user-achievements", {
    achievements: [watchedAchievements]
  });
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
};

const checkForAchievement = (ach, count) => {
  const value = Object.keys(ach).reduce((a, b) => {
    if (count >= ach[b]) {
      return (a = ach[b]);
    }
    return a;
  }, 0);
  return getKeyByValue(ach, value);
};

const achievements = {
  watched: {
    watched1: 1,
    watched10: 10,
    watched100: 100
  },
  favorite: {
    fav1: 1,
    fav10: 10,
    fav100: 100
  },
  time: {
    time10: 10,
    time600: 600,
    time10000: 10000
  }
};

// when to update each. time controller xy in moive is trigerd - middlware for achivments
