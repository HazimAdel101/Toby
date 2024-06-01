const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./config/passportSetup.js');

const app = express();
app.use(express.json());

// Middleware
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

// Routes
app.get('/', (req, res) => {
    console.log(req.user);
    var name = "hazim";
    var name = req.user;
    if (!name) {
        res.send('User not found');
    } else {
        res.send(`name ${name}`);
    }
});

module.exports = app;
