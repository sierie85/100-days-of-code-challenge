const router = require("express").Router();
const searchController = require("../controllers/searchController");

router.post("/search", searchController.searchMovie);

module.exports = router;
