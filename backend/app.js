const express = require('express');
const path = require('path');

const app = express();


const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://cgray009:Iwillfollow7@demo-cluster.40t16.mongodb.net/MEAN?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected')
}).catch(err => console.log(err));

  
app.use(cors());
app.use(bodyparser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', express.static(path.join(__dirname, 'angular')));






const userRoutes = require('./user');
const adminRoutes = require('./admin');



app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
  });





module.exports = app;
