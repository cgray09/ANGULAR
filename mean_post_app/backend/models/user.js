const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // he had to also install
                                                              // this on the terminal 
                                                              // w/ npm
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // throws an error if email isnt unique from user

module.exports = mongoose.model("User", userSchema);
