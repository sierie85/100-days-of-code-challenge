exports.showAchievements = (req, res) => {
  res.render("users/user-achievements");
};

const example = [
  {
    name: "Movies Watched",
    value: 10
  },
  {
    name: "Time watched",
    value: 798
  }
];

// when to update each. time controller xy in moive is trigerd - middlware for achivments
