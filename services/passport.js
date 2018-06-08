const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(done)
  .then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
 },
 // these are the callbacks
 (accessToken, refreshToken, profile, done) => {
   // makes sure that one user is not created multiple times
   User.findOne({ googleId: profile.id }).then((existingUser) => {
     if (existingUser) {
       // already have a record with profile ID
       done(null, existingUser);
     } else {
       // dont have a user record with this ID, make a new record
       new User({ googleId: profile.id})
       .save()
       .then(user => done(null, user));
     }
    })
   })
);
