const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Review", reviewSchema);
