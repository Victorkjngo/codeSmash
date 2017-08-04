'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('config')['passport'];
const models = require('../../db/models/index.js');
const Auth = require('./auth.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // models.Users.findById(id, function (err, user) {
  done(null, user);
  // });
  // return models.Users.findOne({ 'oauth_id': id })
  //   .then((err, users) => {
  //     if (err) {
  //       throw err;
  //     }
  //     done(null, users.serialize());
  //   })
  //   .error(error => {
  //     done(error, null);
  //   })
  //   .catch(() => {
  //     done(null, null, { message: 'No user found' });
  //   });
});


passport.use('google', new GoogleStrategy({
  clientID: config.Google.clientID,
  clientSecret: config.Google.clientSecret,
  callbackURL: config.Google.callbackURL
},
  (accessToken, refreshToken, profile, done) => {
    // getOrCreateOAuthProfile('google', user, done))
    var searchQuery = {
      oauth_id: profile.id
    };
    console.log('THIS IS THE PROFILE: ', profile);
    var updates = {
      name: profile.displayName,
      oauth_id: profile.id
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    models.Users.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
));

module.exports = passport;
