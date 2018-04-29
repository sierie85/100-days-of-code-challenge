const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");
const Watched = require("../models/Watched");
const Favorite = require("../models/Favorite");
const Review = require("../models/Review");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

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

exports.dashboard = async (req, res) => {
  const watchlist = Watchlist.find(
    { userid: req.user._id },
    { movie: { $slice: 3 } }
  ).populate("movie", ["name", "imdbRating", "poster", "runtime"]);

  const watched = Watched.find(
    { userid: req.user._id },
    { movie: { $slice: 3 } }
  )
    .populate("movie", ["name", "imdbRating", "poster", "runtime"])
    .limit(3);

  const favorite = Favorite.find(
    { userid: req.user._id },
    { movie: { $slice: 3 } }
  )
    .populate("movie", ["name", "imdbRating", "poster", "runtime"])
    .limit(3);

  const [list, watch, fav] = await Promise.all([watchlist, watched, favorite]);
  res.render("users/user-dashboard", { list, watch, fav });
};

exports.settings = (req, res) => {
  res.render("users/user-settings");
};

exports.upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    if (file.mimetype.startsWith("image/")) {
      next(null, true);
    } else {
      next({ message: "That filetype isnt allowed" }, false);
    }
  }
}).single("avatar");

exports.updateProfil = async (req, res) => {
  let avatar = "";
  if (req.file) {
    const random = crypto.randomBytes(24).toString("hex");
    const extension = req.file.mimetype.split("/")[1];
    avatar = `${random}.${extension}`;
    fs.writeFile(
      path.join(__dirname, `../public/uploads/${avatar}`),
      req.file.buffer,
      function(err) {
        if (err) {
          return console.log(err);
        }
      }
    );
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        name: req.body.name,
        avatar
      },
      {
        new: true,
        runValidators: true
      }
    );
  } catch (error) {
    console.log(error);
  }
  req.flash("success", "Settings changed");
  res.redirect("/settings");
};

exports.getResetPassword = (req, res) => {
  res.render("users/user-reset-password");
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendResetMail = (email, hash, req) => {
  const mailOptions = {
    from: '"mdbo" <info@mdbo.com>',
    to: email,
    subject: "MDBO - Password reset",
    text: `To reset your password follow go to "http://${
      req.headers.host
    }/set-new-password/${hash}"`,
    html: `To reset your password click this <a href="http://${
      req.headers.host
    }/set-new-password/${hash}">link</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

exports.postResetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const hash = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = hash;
    user.resetPasswordDate = Date.now() + 3600000;
    await user.save();
    sendResetMail(user.email, hash, req);
    req.flash("success", "Password reset send to your email.");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash("danger", "No User with this email found.");
    res.redirect("/login");
  }
};

exports.setResetPassword = async (req, res) => {
  res.render("users/user-set-new-password");
};

exports.setNewPasswordAfterReset = async (req, res) => {
  if (req.body.password !== req.body["password-confirm"]) {
    req.flash("danger", "Password are not the same!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordDate: { $gt: Date.now() }
  });

  if (!user) {
    req.flash("error", "Password reset is invalid or has expired");
    res.redirect("back");
    return;
  }

  try {
    const setNewPass = await user.setPassword(req.body.password, function(
      error
    ) {
      if (!error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function(error) {
          if (error) {
            console.log(error);
          }
          req.flash("success", "Password successfully renewed.");
          res.redirect("/login");
        });
      }
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  if (req.body["new-pass"] !== req.body["new-pass-confirm"]) {
    req.flash("danger", "new password must be the same");
    res.redirect("/settings");
    return;
  }
  if (!req.body["new-pass"].length > 8) {
    req.flash("danger", "new password must be at least 8 charakters long");
    res.redirect("/settings");
    return;
  }
  try {
    const user = await User.findById(req.user._id);
    const setNewPass = await user.setPassword(req.body["new-pass"], function(
      error
    ) {
      if (!error) {
        user.save(function(error) {
          if (error) console.log(error);
        });
      }
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
  req.logout();
  res.redirect("/login");
};

exports.deleteAccount = async (req, res) => {
  if (req.body.email !== req.user.email) {
    res.json("error");
    return;
  }
  const id = req.user._id;
  const user = User.remove({ _id: id });
  const watchlist = Watchlist.remove({ userid: id });
  const watched = Watched.remove({ userid: id });
  const favorite = Favorite.remove({ userid: id });
  const review = Review.remove({ user: id });
  const deleted = await Promise.all([
    user,
    watchlist,
    watched,
    favorite,
    review
  ]);

  res.json("user-deleted");
};
