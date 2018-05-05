const router = require("express").Router();
const statsController = require("../controllers/statsController");

router.get("/stats", statsController.getMovieStats);

module.exports = router;
