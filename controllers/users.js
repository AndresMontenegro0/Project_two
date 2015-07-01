var express = require('express'),
    router  = express.Router(),
    bcrypt  = require('bcrypt'),
    User    = require('../models/user.js');

//New

router.get('/new', function (req, res){
    res.render('users/new')
});

//create

router.post('/', function (req, res){
    bcrypt.genSalt(2, function(err, salt) {
        bcrypt.hash(req.body.user.password, salt, function(err, hash){
            req.body.user.password = hash;

    var newUser = new User(req.body.user);

    newUser.save(function (err, user){
        res.redirect(301, '../')
            });
        })
    })
});
//Login

router.get('/login', function (req, res){
    res.render('users/login');
});

router.post('/login', function (req, res){
    var loginAttempt = req.body.user;

    User.findOne({username: loginAttempt.username}, function (err, user){
        if(user) {
            bcrypt.compare(loginAttempt.password, user.password, function(err, checked) {
                if(checked) {
                    req.session.currentUser = user.username;
            res.redirect(301, '../wikis');
                };
            });
        } else {
            res.redirect(301, '/users/login');
        };
    });
});



module.exports = router;

