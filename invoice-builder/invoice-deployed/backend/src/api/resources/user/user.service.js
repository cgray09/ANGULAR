//import Joi from 'joi';

const Joi = require('joi');

module.exports = {
  validateSignupSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  validateLoginSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  validateForgotSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
    });
    const { error, value } = schema.validate(body);
    if (error && error.details) {
      return { error };
    }
    return { value };
  },
  getUser(user) {
    const rsp = {};
    if (user.local.email) {
      rsp.name = user.local.name;
      rsp.email = user.local.email;
    }
    if (user.google.email) {
      rsp.name = user.google.displayName;
      rsp.email = user.google.email;
    }
    if (user.github.email) {
      rsp.name = user.github.displayName;
      rsp.email = user.github.email;
    }
    if (user.twitter.email) {
      rsp.name = user.twitter.displayName;
      rsp.email = user.twitter.email;
    }
    return rsp;
  },
};
