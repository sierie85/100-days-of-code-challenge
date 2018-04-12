const mongoose = require("mongoose");
const Review = require("../models/Review");

exports.postReview = async (req, res) => {
  const review = await new Review({
    user: req.user._id,
    movie: req.body.movieid,
    review: req.body.review,
    rating: req.body.rating
  }).save();

  res.json("ok");
};
