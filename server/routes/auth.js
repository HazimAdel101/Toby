// const { Router } = require('express');
// const Passport = require('../config/passportSetup.js');
// const UserController = require('../controllers/userController');

// const router = Router();

// const isAuth = (req, res, next) => {
//     if (req.user) {
//         next();
//     }
//     else {
//         res.redirect('/auth/login');
//     }
// };

// router.get('/users', UserController.getAllUsers);
// router.get('/create', UserController.createUser);

// // logout 
// router.get('/logout', (req, res, next) => {
//     req.logout(function (err) {
//         if (err) { return next(err); } 
//         res.redirect('/auth/login'); 
//     });
// });

// // login
// router.get('/login', (req, res) => {
//     if(req.user) {
//         return res.redirect('/');
//     }
//     else {
//         res.send('login page');
//     }
// });

// router.get('/github', Passport.authenticate('github'));

// router.get('/github/callback',
// Passport.authenticate('github', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });

// module.exports = router;



const { Router } = require('express');
const Passport = require('../config/passportSetup.js');
const UserController = require('../controllers/userController');

const router = Router();

const isAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

router.get('/users', isAuth, UserController.getAllUsers);
router.get('/create', isAuth, UserController.createUser);

// Logout
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});

// Login
router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    } else {
        res.send('login page');
    }
});

router.get('/github', Passport.authenticate('github'));

router.get('/github/callback',
    Passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
