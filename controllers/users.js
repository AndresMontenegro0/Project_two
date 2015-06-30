var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

//New

router.get('/new', function (req, res){
    res.render('users/new')
});

//create

router.post('/', function (req, res){
    var newUser = new User(req.body.user);

    newUser.save(function (err, user){
        res.redirect(301, '../')
    })
});

//Logout

router.delete('/logout', function(req, res) {
    console.log('hey');
    req.session.currentUser = undefined;
    res.redirect(301, '/');
});

//Login

router.get('/login', function (req, res){
    res.render('users/login');
});

router.post('/login', function (req, res){
    var loginAttempt = req.body.user;

    User.findOne({username: loginAttempt.username}, function (err, user){
        if(user && user.password === loginAttempt.password){
            req.session.currentUser = user.username;
            res.redirect(301, '../wikis');
        }else{
            res.redirect(301, '/users/login');
        };
    });
});


module.exports = router;

