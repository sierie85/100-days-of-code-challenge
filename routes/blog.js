const router = require("express").Router();
const blogController = require("../controllers/blogController");

router.get("/blog", blogController.blogOverview);
router.get("/blog/:title", blogController.singlePost);

module.exports = router;
