const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const achievementSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  movie: {
    type: Array
  }
});

module.exports = mongoose.model("Achievement", achievementSchema);
