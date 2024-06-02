const express = require('express');
const UserController = require('../controllers/userController');
const {isAuth} = require('../middleware/auth')

const router = express.Router();

router.get('/', isAuth, UserController.getAllUsers);

router.get('/create',  UserController.createUser);

module.exports = router;