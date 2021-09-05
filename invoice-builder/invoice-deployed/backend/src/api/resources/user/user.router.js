// import express from 'express';
// import passport from 'passport';
// import userController from './user.controller';

const express = require('express');
const passport = require('passport');
const userController = require('./user.controller');

const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.post('/forgot-password', userController.forgotPassword);
userRouter.put('/reset-password', passport.authenticate('jwt', { session: false }), userController.resetPassword);
userRouter.post('/test', passport.authenticate('jwt', { session: false }), userController.test);

module.exports = userRouter;