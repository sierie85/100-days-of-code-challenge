const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: "You must enter a title"
  },
  content: {
    type: String,
    required: "You must enter content"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Blog", blogSchema);
