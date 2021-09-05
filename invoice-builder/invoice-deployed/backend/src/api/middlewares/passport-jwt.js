// import PassportJWT from 'passport-jwt';
// import passport from 'passport';
// import { devConfig } from '../../config/env/development';
// import User from '../resources/user/user.model';

const PassportJWT = require('passport-jwt');
const passport = require('passport');
const devConfig = require('../../config/env/development');
const User = require('../resources/user/user.model');

const configureJWTStrategy = () => {
  const opts = {};
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;
  passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
        // or you could create a new account
      });
    })
  );
};

module.exports = configureJWTStrategy;