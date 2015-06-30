var express = require('express'),
    router = express.Router(),
    Wiki = require('../models/wiki.js');

//Index

    router.get('/', function (req, res){
        Wiki.find({}, function (err, wikisArray){
        if (err) {
        } else if(req.session.currentUser) {
            res.render('wikis/index', {wikis: wikisArray});
        }else {
            res.redirect(301, '/../');
        };
        });
    });

//New

router.get('/new', function (req, res){
    res.render('wikis/new');
});

// Create
router.post('/', function (req,res){
    var newWiki = new Wiki(req.body.wiki);

    newWiki.author = req.session.currentUser;

    newWiki.save(function (err, wiki){
        if(err) {
            console.log(err);
        } else {
            console.log("wiki:" + wiki);
            res.redirect(301, '/wikis');
        }
    });
});

//Show

router.get('/:id', function (req,res){
    var mongoId = req.params.id;

    Wiki.findOne({_id:mongoId}, function (err, foundWiki){
        if(err) {
            console.log(err);
        }else {
            res.render('wiki/show', {wiki:foundWiki,
            currentUser: req.session.currentUser});
        };
    });
});

//Delete

router.delete('/:id', function (req, res){
    var mongoId = req.params.id;

    Wiki.remove({_id:mongoId}, function (err, foundWiki){
        res.redirect(301, '/wikis');
    });
});

//Edit

router.get('/:id/edit', function (req, res){
    var mongoId = req.params.id;

    Wiki.findOne({_id:mongoId}, function (err, foundWiki){
        if(err) {
            console.log(err);
        }else{
            res.render('wikis/edit', {wiki:foundWiki});
        };
    });
})

//Update

router.patch('/:id', function (req, res){
    var mongoId = req.params.id;
    var updatedWiki = req.body.wiki;

    Wiki.update({_id:mongoId}, updateWiki, function (err, foundWiki){
        if(err) {
            console.log(err);
        } else {
            res.redirect(301, '/wikis/' + mongoId);
        };
    });
});

module.exports=router;