// import express from 'express';
// import logger from 'morgan';
// import swaggerUi from 'swagger-ui-express';
// import cors from 'cors';
// import passport from 'passport';
// import session from 'express-session';
// import pdf from 'express-pdf';

// import swaggerDocument from '../../config/swagger.json';
// import { configureJWTStrategy } from './passport-jwt';
// import { configureGoogleStrategy } from './passport-google';
// import { devConfig } from '../../config/env/development';
// import User from '../resources/user/user.model';
// import { configureTwitterStrategy } from './passport-twitter';
// import { configureGithubStrategy } from './passport-github';

const swaggerDocument = require('../../config/swagger.json');
const configureJWTStrategy = require('./passport-jwt');
const configureGoogleStrategy = require('./passport-google');
const devConfig = require('../../config/env/development');
const User = require('../resources/user/user.model');
const configureTwitterStrategy = require('./passport-twitter');
const configureGithubStrategy = require('./passport-github');

const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const passport = require('passport');
//const session = require('express-session');
const session = require('cookie-session');
const pdf = require('express-pdf');

 const setGlobalMiddleware = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(pdf);
  app.use(logger('dev'));
  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize({ userProperty: 'currentUser' }));
  app.use(passport.session());
  configureJWTStrategy();
  configureGoogleStrategy();
  //configureTwitterStrategy();
  configureGithubStrategy();

  // save user into session
  // req.session.user = {userId}
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  // extract the userId from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true
    })
  );
  app.get('/failure', (req, res) =>
    res.redirect('http://localhost:4200/login')
  );
};

module.exports = setGlobalMiddleware;