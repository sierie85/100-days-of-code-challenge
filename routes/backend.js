const router = require("express").Router();
const userController = require("../controllers/userController");
const backendController = require("../controllers/backendController");
const blogController = require("../controllers/blogController");
const movieController = require("../controllers/movieController");

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
router.get(
  "/backend/add-post",
  userController.logedinAdmin,
  blogController.addPost
);

router.post(
  "/backend/add-post",
  userController.logedinAdmin,
  blogController.createPost
);

module.exports = router;
