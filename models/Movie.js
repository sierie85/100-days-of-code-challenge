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
			required: 'You must enter a genre'
		},
		actors: {
			type: Array,
			required: 'You must enter a actor'
		},
		director: {
			type: String,
			trim: true
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
			type: String,
			trim: true,
			required: 'You must enter rated'
    },
    released: {
			type: Date
    },
    poster: {
			type: String,
			trim: true,
		},
		imdbRating: {
			type: String,
		},
		imdbID: {
			type: String,
		}
  }
);

module.exports = mongoose.model('Movie', movieSchema);
