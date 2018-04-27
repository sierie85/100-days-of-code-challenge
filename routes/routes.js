const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const movieController = require("../controllers/movieController");
const userController = require("../controllers/userController");
const achievementController = require("../controllers/achievementController");
const statsController = require("../controllers/statsController");
const searchController = require("../controllers/searchController");
const userListsController = require("../controllers/userListsController");
const reviewController = require("../controllers/reviewController");
const chatController = require("../controllers/chatController");
const backendController = require("../controllers/backendController");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const User = require("../models/User");

// Index route
router.get("/", homeController.getContent);

// User routes
router.get("/login", (req, res) => {
  res.render("users/user-login");
});
router.post("/login", userController.login);
router.get("/register", (req, res) => {
  res.render("users/user-register");
});
router.post("/register", userController.registerNewUser);
router.get("/logout", userController.logout);
router.get("/dashboard", userController.dashboard);
router.get("/settings", userController.logedin, userController.settings);
router.post("/settings", userController.logedin, userController.updateProfil);
router.get("/password-reset", userController.getResetPassword);
router.post("/password-reset", userController.postResetPassword);
router.post(
  "/change-password",
  userController.logedin,
  userController.changePassword
);
router.get("/set-new-password/:token", userController.setResetPassword);
router.post(
  "/set-new-password/:token",
  userController.setNewPasswordAfterReset
);
router.post(
  "/delete-account",
  userController.logedin,
  userController.deleteAccount
);
router.get(
  "/achivments",
  userController.logedin,
  achievementController.showAchievements
);

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
router.get("/movies/:movie", movieController.getMovie);

router.post("/add-review", userController.logedin, reviewController.postReview);

// Stats routes
router.get("/stats", statsController.getMovieStats);

// Search routes
router.post("/search", searchController.searchMovie);

// Chat routes
router.get("/chat", chatController.getChat);

// Backend routes
router.get(
  "/backend",
  userController.logedinAdmin,
  backendController.backendOverview
);
router.get(
  "/backend/add-movie",
  userController.logedinAdmin,
  movieController.addMovie
);
router.post(
  "/backend/add-movie",
  userController.logedinAdmin,
  movieController.createMovie
);

module.exports = router;
