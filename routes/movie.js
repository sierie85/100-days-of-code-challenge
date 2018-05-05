const router = require("express").Router();
const userController = require("../controllers/userController");
const movieController = require("../controllers/movieController");
const reviewController = require("../controllers/reviewController");

router.get("/movies", movieController.getMovies);
router.get("/movies/page/:page", movieController.getMovies);
router.get("/movies/:movie", movieController.getMovie);
router.post("/add-review", userController.logedin, reviewController.postReview);

module.exports = router;
