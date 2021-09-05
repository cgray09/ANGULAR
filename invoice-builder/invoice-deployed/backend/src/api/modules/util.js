// import jwt from 'jsonwebtoken';
// import bcryptjs from 'bcryptjs';
// import { devConfig } from '../../config/env/development';

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const devConfig = require('../../config/env/development');

module.exports = getJWTToken = payload => {
  const token = jwt.sign(payload, devConfig.secret, {
    expiresIn: '1d',
  });
  return token;
};
module.exports = getEncryptedPassword = async password => {
  console.log("password: ", password);
  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};
