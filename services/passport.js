const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');
const prod = require('../config/prod');

// called when a user wants to generate an identifying piece of info
 passport.serializeUser((user, done) => {
  done(null, user.id);
});

// takes identifying piece of info from cookie
// passes into deserializeUser to turn it into
// a user model that uniquely identifies the user
 passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

 passport.use(
  new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: prod.googleRedirectURI,
  proxy: true
 },
 // these are the callbacks
 async (accessToken, refreshToken, profile, done) => {
   // makes sure that one user is not created multiple times
  const existingUser = await User.findOne({ googleId: profile.id })
     if (existingUser) {
       // already have a record with profile ID
      return done(null, existingUser);
     }
       // dont have a user record with this ID, make a new record
    const user = await new User({ googleId: profile.id}).save()
      done(null, user);
   }
  )
);
