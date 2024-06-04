const { Router } = require('express');
const passport = require('passport');
const Passport = require('../config/passportSetup.js');
const UserController = require('../controllers/userController');
const { User } = require('../models');
const {isAuth} = require('../middleware/auth')
const router = Router();

router.get('/logout', isAuth, (req, res, next) => {
    UserController.logoutUser(req, res, next);
});

router.get('/github', Passport.authenticate('github'));

router.get('/github/callback',
    Passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/toby');
    });



module.exports = router;