const passport = require('passport');
const Gstrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// generates cookie data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// grabs user with cookie data
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// handles authentication
passport.use(
  new Gstrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // after authentication approval, this callback is initiated
    // console.log(accessToken);
    User.findOne({googleId: profile.id}).then((existingUser) => {
      if (existingUser) {
        // handle existing user
        done(null, existingUser);
      } else {
        new User({googleId: profile.id})
          .save()
          .then((user) => done(null, user));
      }
    });
  })
);
