
    var express         = require('express'),
        server          = express(),
        ejs             = require('ejs'),
        bodyParser      = require('body-parser'),
        methodOverride  = require('method-override'),
        expressLayouts  = require ('express-ejs-layouts'),
        morgan          = require('morgan'),
        mongoose        = require('mongoose'),
        session         = require('express-session');

//Setting to process port if defined otherwise default to 3000
console.log(process.env.MONGOLAB_URI);
var PORT        = process.env.PORT || 3000;
var MONGOURI    = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/project_two';

//set

server.set('views','./views');
server.set('view engine', 'ejs');

//Use

server.use(session({
    secret: "insertsecret",
    resave: true,
    saveUninitialized: false
}));

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(express.static('./public'));
server.use(methodOverride('_method'));
server.use(morgan('short'));
server.use(expressLayouts);

//routers and controllers

var wikiController = require('./controllers/wikis.js');
server.use('/wikis', wikiController);

var userController = require('./controllers/users.js');
server.use('/users', userController);

server.get('/', function (req, res){
    res.render('welcome')
});

//catchall routes
server.use(function (req, res){
    res.send("You have reached this page in error");
});

//database and server

mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function(err){
    console.log(err);
    console.log("Database errors!");
});

db.once('open' , function (){
    console.log("Database is Running");
    server.listen(PORT, function(){
        console.log("The Server is Running")
    })
});
