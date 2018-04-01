const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
	{
		email: {
      type: String,
			unique: true,
		  lowercase: true,
		  trim: true,
			required: 'You must enter a email'
		},
		name: {
			type: String,
			trim: true,
		}
  }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
