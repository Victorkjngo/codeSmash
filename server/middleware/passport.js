'use strict';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('config')['passport'];
const models = require('../../db/models/index.js');
const Auth = require('./auth.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return models.Users.findOne({ 'oauth_id': id })
    .then((err, users) => {
      if (err) {
        throw err;
      }
      done(null, users.serialize());
    })
    .error(error => {
      done(error, null);
    })
    .catch(() => {
      done(null, null, { message: 'No user found' });
    });
});


passport.use('google', new GoogleStrategy({
  clientID: config.Google.clientID,
  clientSecret: config.Google.clientSecret,
  callbackURL: config.Google.callbackURL
},
  (accessToken, refreshToken, user, done) => getOrCreateOAuthProfile('google', user, done))
);


const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
  console.log('\n\n this is the oAUTH PROFILE: \n\n', oauthProfile);
  let query = { 'oauth_id': oauthProfile.id }
  return models.Users.findOne(query)
    .then((err, oauthAccount) => {
      if (err) return handleError(err);

      if (oauthAccount) {
        throw oauthAccount;
      }

      if (!oauthProfile.emails || !oauthProfile.emails.length) {
        // FB users can register with a phone number, which is not exposed by Passport
        throw null;
      }
      let profileInfo = {
        first: oauthProfile.name.givenName,
        last: oauthProfile.name.familyName,
        display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
        email: oauthProfile.emails[0].value
      };
    })
    // .then(profile => {
// GOOGLE PROFILE
// { id: '103112202268136533606',
//   displayName: 'Jun Park',
//   name: { familyName: 'Park', givenName: 'Jun' },
//   emails: [ { value: 'junjunparkpark@gmail.com', type: 'account' } ],
//   photos: [ { value: 'https://lh6.googleusercontent.com/-L-zBolXGOvU/AAAAAAAAAAI/AAAAAAAADrg/g1kLItb0Hmw/photo.jpg?sz=50' } ],
//   gender: 'male',
//   provider: 'google',}


    //   if (profile) {
    //     //update profile with info from oauth
    //     return profile.save(profileInfo, { method: 'update' });
    //   }
    //   // otherwise create new profile
    //   return models.Profile.forge(profileInfo).save();
    // })
    // .tap(profile => {
    //   return models.Auth.forge({
    //     type,
    //     profile_id: profile.get('id'),
    //     oauth_id: oauthProfile.id
    //   }).save();
    // })
    // .error(err => {
    //   done(err, null);
    // })
    // .catch(oauthAccount => {
    //   if (!oauthAccount) {
    //     throw oauthAccount;
    //   }
    //   return oauthAccount.related('profile');
    // })
    .then(profile => {
      // if (profile) {
      //   console.log('SERIALIZING USER: ', profile);
      //   done(null, profile.serialize());
      // }
      return models.Users.findOneAndUpdate(query, profileInfo, {upsert: true}, (err, user) => {
        if (err) handleError(err);
        console.log('SUCCESSFULLY SAVED USER: \n', user)
        return 'SUCCESSFULLY SAVED USER: ' + user;
      })
    })
    .catch(() => {
      // TODO: This is not working because redirect to login uses req.flash('loginMessage')
      // and there is no access to req here
      done(null, null, {
        'message': 'Signing up requires an email address, \
          please be sure there is an email address associated with your Facebook account \
          and grant access when you register.' });
    });
};

module.exports = passport;
