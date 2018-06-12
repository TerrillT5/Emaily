const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const passport = require('passport');
const app = express();
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
// get method of request
// path to handle then whats executed when a request comes in

// how long this cookie is in browser
// until it expires
// 30 days, 24 hours, 60 mins, 60 secs, 1000 millisecs to 1 sec
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);


// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=881656482840-e9o23lgru7u1b5o3bk56002qgcs5k922.apps.googleusercontent.com