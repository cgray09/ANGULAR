// import express from 'express';
// import passport from 'passport';
// import invoiceController from './invoice.controller';

const express = require('express');
const passport = require('passport');
const invoiceController = require('./invoice.controller');

const invoiceRouter = express.Router();
invoiceRouter
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), invoiceController.create)
  .get(passport.authenticate('jwt', { session: false }), invoiceController.findAll);

invoiceRouter
  .route('/:id')
  .put(passport.authenticate('jwt', { session: false }), invoiceController.update)
  .delete(passport.authenticate('jwt', { session: false }), invoiceController.delete)
  .get(passport.authenticate('jwt', { session: false }), invoiceController.findOne);

invoiceRouter.get('/:id/download', passport.authenticate('jwt', { session: false }), invoiceController.download);

module.exports = invoiceRouter;