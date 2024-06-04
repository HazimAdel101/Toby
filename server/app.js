const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const expressLayouts = require('express-ejs-layouts');
const passportSetup = require('./config/passportSetup.js');

const app = express();
app.use(express.json());

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
});

app.use(morgan('combined', { stream: accessLogStream }));

// static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/css'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/uploads', express.static(__dirname + 'public/uploads'));

app.set('view engine', 'ejs');

// middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // HTTP or HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

module.exports = app;