const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");

exports.registerNewUser = async (req, res) => {
  if (req.body.password.length < 9) {
    req.flash("danger", "Password should have a minimum length of 8!");
    res.redirect("/register");
    return;
  }

  const user = new User({ email: req.body.email });
  try {
    await User.register(user, req.body.password);
  } catch (err) {
    req.flash("danger", err.message);
    res.redirect("/register");
  }

  res.redirect("/login");
};

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: "Failed to login!",
  successRedirect: "/",
  successFlash: "Successfully loged in!"
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Your are now logged out!");
  res.redirect("/");
};

exports.logedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash("danger", "You must be logged in to see this page!");
  res.redirect("/login");
};

exports.logedinAdmin = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole === "admin" && req.isAuthenticated()) {
    next();
    return;
  } else {
    req.flash("danger", "You must be logged in to see this page!");
    res.redirect("/login");
  }
};

exports.settings = (req, res) => {
  res.render("users/user-settings");
};

exports.updateProfil = async (req, res) => {
  var query = { _id: req.body._id };
  const user = await User.findOneAndUpdate(
    query,
    {
      name: req.body.name
    },
    {
      new: true,
      runValidators: true
    }
  );
  req.flash("success", "Settings changed");
  res.redirect("/settings");
};

exports.deleteAccount = async (res, req) => {
  res.json("user-deleted");
};
