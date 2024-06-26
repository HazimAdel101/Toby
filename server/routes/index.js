const express = require('express');
const UserController = require('../controllers/userController');
const CollectionController = require('../controllers/collectionController');
const RenderController = require('../controllers/renderController');
const {isAuth} = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/register', (req , res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        await UserController.createUserForm({ firstName, lastName, email, password });
        res.redirect('/toby');
    } catch (error) {
        console.error('Error creating user:', error);
        res.redirect('/error');
    }
});

// Login
router.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    } else {
        res.render('login');
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserController.loginUser(email, password);
        req.login(user, (err) => {
            if (err) {
                console.error('Login failed:', err);
                return next(err);
            }
            return res.redirect('/toby');
        });
    } catch (error) {
        console.error('Login failed:', error);
        return res.redirect('/login'); 
    }
});

// render main page
router.get('/toby', isAuth, RenderController.renderMainPage);
// router.get('/toby', isAuth, CollectionController.getUserCollections);

module.exports = router;