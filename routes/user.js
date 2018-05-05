const router = require("express").Router();
const userController = require("../controllers/userController");
const achievementController = require("../controllers/achievementController");
const userListsController = require("../controllers/userListsController");

router.get("/dashboard", userController.logedin, userController.dashboard);
router.get("/settings", userController.logedin, userController.settings);
router.post(
  "/settings",
  userController.logedin,
  userController.upload,
  userController.updateProfil
);
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
  "/list/:schema",
  userController.logedin,
  userListsController.getlist
);
router.post(
  "/updatelist",
  userController.logedin,
  userListsController.updateUserList
);

router.get(
  "/achivments",
  userController.logedin,
  achievementController.showAchievements
);

module.exports = router;
