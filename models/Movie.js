const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const movieSchema = new mongoose.Schema(
	{
		name: {
			type: String,
      trim: true,
      unique: true,
			required: 'You must enter a name'
    },
    genre: {
			type: Array,
			trim: true,
			required: 'You must enter a genre'
    },
		description: {
			type: String,
			trim: true,
			required: 'You must enter a description'
    },
		runtime: {
			type: Number,
			trim: true,
			required: 'You must enter a runtime'
    },
		rated: {
			type: Number,
			trim: true,
			required: 'You must enter rated'
    },
    released: {
			type: Date,
			trim: true,
			required: 'You must enter a release date'
    },
    poster: {
			type: String,
			trim: true,
    }
  }
);

module.exports = mongoose.model('Movie', movieSchema);
