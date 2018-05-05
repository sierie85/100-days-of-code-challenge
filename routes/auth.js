const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/login", (req, res) => {
  res.render("users/user-login");
});
router.post("/login", userController.login);
router.get("/register", (req, res) => {
  res.render("users/user-register");
});
router.post("/register", userController.registerNewUser);
router.get("/logout", userController.logout);

module.exports = router;
