const express = require('express');
const router = express.Router();

const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
            isAdmin: 0
        });
        user.save().then(result => {
            res.status(201).json({message: 'User Created'});
        }).catch(error => {
            console.log(error);
        });
    });
});

router.post('/login', (req, res, next) => {
    let fetcheduser;
    let a;
    User.findOne({email: req.body.email}).then(user => {
        fetcheduser = user;
        if(!user) {
            return res.status(404).json({message: 'Auth Failed'});
        }
       return bcrypt.compare(req.body.password, user.password)
    }).then(result => {
        if(!result) {
            res.status(404).json({message: 'Auth Failed'});
        }
        const administrator = fetcheduser.isAdmin;
        console.log("fetcheduser: ", fetcheduser);
        const token = jwt.sign({email: fetcheduser.email, userId: fetcheduser._id}, 'secret-long', {expiresIn: '1h'});
        res.status(200).json({email: fetcheduser.email, token: token, expiresIn: 3600, admin: administrator});
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;