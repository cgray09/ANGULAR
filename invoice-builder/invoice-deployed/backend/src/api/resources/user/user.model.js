//import mongoose from 'mongoose';

const mongoose = require('mongoose');


const { Schema } = mongoose;
const UserSchema = new Schema({
  local: {
    name: String,
    email: String,
    password: String,
  },
  google: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
  twitter: {
    username: String,
    id: String,
    token: String,
    displayName: String,
    email: String,
  },
  github: {
    email: String,
    id: String,
    displayName: String,
    token: String,
  },
});
module.exports = mongoose.model('User', UserSchema);
