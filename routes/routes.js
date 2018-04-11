const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const userController = require("../controllers/userController");
const statsController = require("../controllers/statsController");
const searchController = require("../controllers/searchController");
const userListsController = require("../controllers/userListsController");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const User = require("../models/User");

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
router.get("/achivments", userController.logedin, (req, res) => {
  res.render("user-achivments");
});

// Userlists routes
router.get(
  "/list/:schema",
  userController.logedin,
  userListsController.getlist
);
router.post(
  "/updatelist",
  userController.logedin,
  userListsController.updateUserList
);

// Movie routes
router.get("/movies", movieController.getMovies);
router.get("/movies/page/:page", movieController.getMovies);
router.get("/add-movie", movieController.addMovie);
router.post("/add-movie", movieController.createMovie);
router.get("/movies/:movie", movieController.getMovie);

router.post("/add-review", userController.logedin, (req, res) =>
  res.json(req.body)
);

// Stats routes
router.get("/stats", statsController.getMovieStats);

// Search routes
router.post("/search", searchController.searchMovie);

module.exports = router;
