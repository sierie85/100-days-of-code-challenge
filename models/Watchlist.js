const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const watchlistSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  movie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
