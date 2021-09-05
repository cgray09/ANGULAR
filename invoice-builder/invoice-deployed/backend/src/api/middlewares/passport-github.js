// import passport from 'passport';
// import GithubStrategy from 'passport-github';
// import { devConfig } from '../../config/env/development';
// import User from '../resources/user/user.model';

const passport = require('passport');
const GithubStrategy = require('passport-github');
const devConfig = require('../../config/env/development');
const User = require('../resources/user/user.model');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
const configureGithubStrategy = () => {
  passport.use(
    new GithubStrategy.Strategy(
      {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL,
      },
      async (token, tokenSecret, profile, done) => {
        try {
          // find the user by github id
          const user = await User.findOne({ 'github.id': profile.id });
          console.log(profile);
          if (user) {
            return done(null, user);
          }
          const newUser = new User({});
          newUser.github.id = profile.id;
          newUser.github.token = token;
          newUser.github.username = profile.username;
          //newUser.github.email = profile.emails[0].value;
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

module.exports = configureGithubStrategy;