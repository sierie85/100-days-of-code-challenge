const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const userController = require("../controllers/userController");
const watchlistController = require("../controllers/watchlistController");
const statsController = require("../controllers/statsController");
const searchController = require("../controllers/searchController");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");

// Index route
router.get("/", async (req, res) => {
  const newestMovies = await Movie.find()
    .sort({ released: -1 })
    .limit(4);
  const bestRatedMovies = await Movie.find()
    .sort({ imdbRating: -1 })
    .limit(4);
  res.render("index", { newestMovies, bestRatedMovies });
});

// User routes
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", userController.login);
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", userController.registerNewUser);
router.get("/logout", userController.logout);
router.get("/settings", userController.logedin, userController.settings);
router.post("/settings", userController.logedin, userController.updateProfil);

// Watchlist routes
router.get(
  "/watchlist",
  userController.logedin,
  watchlistController.getWatchlist
);
router.post(
  "/delete-from-watchlist",
  userController.logedin,
  watchlistController.deleteFromWatchlist
);
router.post(
  "/update-watchlist",
  userController.logedin,
  watchlistController.updateWatchlist
);

// Movie routes
router.get("/movies", movieController.getMovies);
router.get("/movies/page/:page", movieController.getMovies);
router.get("/add-movie", movieController.addMovie);
router.post("/add-movie", movieController.createMovie);
router.get("/movies/:movie", movieController.getMovie);

router.get("/stats", statsController.getMovieStats);

router.post("/search", searchController.searchMovie);

module.exports = router;
