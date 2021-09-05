// import express from 'express';
// import mongoose from 'mongoose';
// import { restRouter } from './api';
// import { devConfig } from './config/env/development';
const express = require('express');
const mongoose = require('mongoose');
const restRouter = require('./api');
const devConfig = require('./config/env/development');
const setGlobalMiddleware = require('./api/middlewares/global-middleware');
var morgan = require('morgan');
const path = require("path");

mongoose.Promise = global.Promise;
const app = express();
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//const PORT = devConfig.port;

// register global middleware
setGlobalMiddleware(app);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/api', restRouter);
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.message = 'Invalid route';
//   error.status = 404;
//   next(error);
// });
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   return res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });

const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "angular")));
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });
if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'angular');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
