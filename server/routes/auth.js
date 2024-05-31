import { Router } from 'express';
import Passport from '../config/passportSetup.js';

const router = Router();

const isAuth = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// logout 
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); } 
        res.redirect('/auth/login'); 
    });
});

// login
router.get('/login', (req, res) => {
    if(req.user) {
        return res.redirect('/');
    }
    else {
        res.send('login page');
    }
})

router.get('/github', Passport.authenticate('github'));

router.get('/github/callback',
Passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

export default router;