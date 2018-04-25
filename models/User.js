const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "You must enter a email",
    validate: [validator.isEmail, "invalid email"]
  },
  role: {
    type: String,
    default: "user"
  },
  name: {
    type: String,
    trim: true
  },
  achievements: {
    type: Array
  },
  resetPasswordToken: String,
  resetPasswordDate: Date
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
