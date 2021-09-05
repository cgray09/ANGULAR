// import jwt from 'jsonwebtoken';
// import { devConfig } from '../../../config/env/development';

const jwt = require('jsonwebtoken');
const devConfig = require('../../../config/env/development');
var passport  = require('passport');
require('../../middlewares/passport-jwt')(passport);

module.exports = {
  sendJWTToken(req, res) {
    const token = jwt.sign({ id: req.currentUser._id }, process.env.SECRET, {
      expiresIn: '1d',
    });
    res.redirect(`https://mean-invoice.herokuapp.com/dashboard/invoices/?token=${token}`);
  },
  authenticate(req, res) {
    return res.send(true);
  },
  async logout(req, res) {
    await req.logout(); // remove the session and remove req.currentUser;
    return res.json({ success: true });
  },
};
