const express = require('express');
const UserController = require('../controllers/userController');
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
        // await createUserForm({ firstName, lastName, email, password });
        await UserController.createUserForm({ firstName, lastName, email, password });
        res.redirect('/success'); // Redirect to a success page or wherever you want
    } catch (error) {
        console.error('Error creating user:', error);
        res.redirect('/error'); // Redirect to an error page or handle the error appropriately
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

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserController.loginUser(email, password);
//         res.redirect('/dashboard'); // Redirect to dashboard or home page
//     } catch (error) {
//         console.error('Login failed:', error);
//         res.redirect('/login'); // Redirect back to login page on failure
//     }
// });


router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserController.loginUser(email, password);
        req.login(user, (err) => {
            if (err) {
                console.error('Login failed:', err);
                return next(err);
            }
            return res.redirect('/dashboard'); // Redirect to dashboard or home page
        });
    } catch (error) {
        console.error('Login failed:', error);
        return res.redirect('/login'); // Redirect back to login page on failure
    }
});

module.exports = router;