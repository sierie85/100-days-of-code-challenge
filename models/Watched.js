const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const watchedSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  movie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    }
  ]
});

module.exports = mongoose.model("Watched", watchedSchema);
