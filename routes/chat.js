const router = require("express").Router();
const chatController = require("../controllers/chatController");

router.get("/chat", chatController.getChat);

module.exports = router;
