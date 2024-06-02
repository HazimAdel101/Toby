const { Router } = require('express');
const passport = require('passport');
const Passport = require('../config/passportSetup.js');
const UserController = require('../controllers/userController');
const { User } = require('../models');
const {isAuth} = require('../middleware/auth')
const router = Router();


// Logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});


router.get('/github', Passport.authenticate('github'));

router.get('/github/callback',
    Passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/woooww');
    });



module.exports = router;