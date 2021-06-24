const express = require('express');
const path = require('path');

const app = express();


const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://mark:SnNEkzsOfYzG64km@cluster0-f3i7r.mongodb.net/test?retryWrites=true';

mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
    console.log('Connected')
}).catch(err => console.log(err));


app.use(cors());
app.use(bodyparser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/', express.static(path.join(__dirname, 'angular')));






const userRoutes = require('./user');
const adminRoutes = require('./admin');



app.use('/api/user', userRoutes); // that way we dont have to type
                                  // "/api/user" for every route in
                                  // "user.js"
app.use('/api/admin', adminRoutes);
// app.use((req, res, next) => {
//    res.sendFile(__dirname, 'angular', 'index.html');
//    });




module.exports = app;
