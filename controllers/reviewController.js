const mongoose = require("mongoose");
const Review = require("../models/Review");

exports.postReview = async (req, res) => {
  const review = await Review.findOne({
    user: req.user._id,
    movie: req.body.movieid
  });
  if (!review) {
    const review = await new Review({
      user: req.user._id,
      movie: req.body.movieid,
      review: req.body.review,
      rating: req.body.rating
    }).save();

    const newReview = await review
      .populate("user", ["name", "email"])
      .execPopulate();

    res.json(newReview);
  } else {
    req.flash("danger", "Already sumbit review to this movie!");
    res.render(`/`);
  }
};
