// import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth';
// import { devConfig } from '../../config/env/development';
// import User from '../resources/user/user.model';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const devConfig = require('../../config/env/development');
const User = require('../resources/user/user.model');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy.OAuth2Strategy(
      {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //   User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
          console.log('accessToken: ', accessToken);
          console.log('refreshToken: ', refreshToken);
          console.log('profile: ', profile);

          // find the user by google id
          const user = await User.findOne({ 'google.id': profile.id });
          if (user) {
            // if user exit
            // return this user
            return done(null, user);
          }

          // otherwise create the user with google
          const newUser = new User({});
          // save accessToken, email, displayName, id
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.displayName = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};

module.exports = configureGoogleStrategy;