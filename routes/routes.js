const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');

router.get('/', async (req,res) => {
  const movies = await Movie.find().limit(3);
  res.render('index', {movies});
});

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/movies', movieController.getMovies);
router.get('/add-movie', movieController.addMovie);

router.post('/add-movie', movieController.createMovie);

module.exports = router;
