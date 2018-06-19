const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI)

console.log(keys, 'ee')

const app = express();

// get method of request
// path to handle then whats executed when a request comes in
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
 
}


const PORT = process.env.PORT || 5000;
app.listen(PORT)


// https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=881656482840-e9o23lgru7u1b5o3bk56002qgcs5k922.apps.googleusercontent.com
