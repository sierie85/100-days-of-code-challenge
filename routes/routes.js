const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

router.get('/', async (req,res) => {
  const newestMovies = await Movie.find().sort({released: -1}).limit(4);
  const bestRatedMovies = await Movie.find().sort({imdbRating: -1}).limit(4);
  res.render('index', {newestMovies, bestRatedMovies});
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/movies', movieController.getMovies);
router.get('/add-movie', movieController.addMovie);

router.post('/add-movie', movieController.createMovie);

router.get('/movies/:movie', movieController.getMovie);

module.exports = router;
