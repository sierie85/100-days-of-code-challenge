const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const favoriteSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Favorite", favoriteSchema);
