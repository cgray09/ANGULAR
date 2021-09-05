// import { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, NOT_FOUND } from 'http-status-codes';
// import bcryptjs from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import userService from './user.service';
// import User from './user.model';
// import { devConfig } from '../../../config/env/development';
// import { getJWTToken, getEncryptedPassword } from '../../modules/util';
// import { sendEmail } from '../../modules/mail';

const BAD_REQUEST = require('http-status-codes');
const INTERNAL_SERVER_ERROR = require('http-status-codes');
const UNAUTHORIZED = require('http-status-codes');
const NOT_FOUND = require('http-status-codes');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');
const User = require('./user.model');
const devConfig = require('../../../config/env/development');
const getJWTToken = require('../../modules/util');
const getEncryptedPassword = require('../../modules/util');
const sendEmail = require('../../modules/mail');
var passport  = require('passport');
require('../../middlewares/passport-jwt')(passport);

module.exports = {
  async signup(req, res) {
    try {
      const { error, value } = userService.validateSignupSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      
      const existingUser = await User.findOne({ 'local.email': value.email });
      if (existingUser) {
        return res.status(BAD_REQUEST).json({ err: 'You have already created account' });
      }
      const user = await new User();
      user.local.email = value.email;
      user.local.name = value.name;
      const salt = await bcryptjs.genSalt();
      const hash = await bcryptjs.hash(value.password, salt);
      user.local.password = hash;
      await user.save();
      return res.json({ success: true, message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
  async login(req, res) {
    try {
      const { error, value } = userService.validateLoginSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.findOne({ 'local.email': value.email });
      if (!user) {
        return res.status(BAD_REQUEST).json({ err: 'invalid email or password' });
      }
      const matched = bcryptjs.compare(value.password, user.local.password);
      if (!matched) {
        return res.status(UNAUTHORIZED).json({ err: 'invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: '1d',
      });
      await req.login(user, function(err) {
        if (err) { return next(err); }
        return res.json({ success: true, token });
      });
      
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
  async test(req, res) {
    return res.json(req.currentUser);
  },
  async forgotPassword(req, res) {
    try {
      const { value, error } = userService.validateForgotSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const criteria = {
        $or: [
          { 'google.email': value.email },
          { 'github.email': value.email },
          { 'twitter.email': value.email },
          { 'local.email': value.email },
        ],
      };
      const user = await User.findOne(criteria);
      if (!user) {
        return res.status(NOT_FOUND).json({ err: 'could not find user' });
      }
      
      const token = getJWTToken({ id: user._id });
      
      const resetLink = `
       <h4> Please click on the link to reset the password </h4>

       <a href ='${devConfig.frontendURL}/reset-password/${token}'>Reset Password</a>
      `;
      const sanitizedUser = userService.getUser(user);
      console.log("forgotPassword 1");
      const results = await sendEmail({
        html: resetLink,
        subject: 'Forgot Password',
        email: sanitizedUser.email,
      });
      console.log("forgotPassword 2");
      return res.json(results);
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
  async resetPassword(req, res) {
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(BAD_REQUEST).json({ err: 'password is required' });
      }
      const user = await User.findById(req.currentUser._id);
      const sanitizedUser = userService.getUser(user);
      if (!user.local.email) {
        user.local.email = sanitizedUser.email;
        user.local.name = sanitizedUser.name;
      }
      const hash = await getEncryptedPassword(user.local.password);
      user.local.password = hash;
      await user.save();
      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).json(err);
    }
  },
};
