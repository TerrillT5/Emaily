const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();


//client id 881656482840-e9o23lgru7u1b5o3bk56002qgcs5k922.apps.googleusercontent.com
// client secret Uro5xHN7FZLor6rQUNmpIT85
passport.use(new GoogleStrategy());

const PORT = process.env.PORT || 5000;
app.listen(PORT);
