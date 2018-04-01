const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');

exports.registerNewUser = async (req, res) => {
  const user = new User({email: req.body.email});
  await User.register(user, req.body.password);
  res.redirect('/login');
}

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
	failureFlash: 'Failed to login!',
	successRedirect: '/',
	successFlash: 'Successfully loged in!'
});

exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Your are now logged out!');
	res.redirect('/');
};
