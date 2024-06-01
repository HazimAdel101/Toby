// const passport = require("passport");
// const { Strategy: GitHubStrategy } = require('passport-github');
// const keys = require('./keys.js');
// const User = require('../models/User.js');

// passport.serializeUser(function (user, cb) {
//     cb(null, user.id);
// });

// passport.deserializeUser(function (id, cb) {
//     cb(null, id);
// });

// passport.use(new GitHubStrategy({
//     clientID: keys.github.clientID,
//     clientSecret: keys.github.clientSecret,
//     callbackURL: keys.github.callbackURL
// }, async (accessToken, refreshToken, profile, cb) => {
//     try {
//         console.log(profile);
//         cb(null, profile);
//     } catch (err) {
//         console.log(err);
//         cb(err);
//     }
// }));

// module.exports = passport;


const passport = require("passport");
const { Strategy: GitHubStrategy } = require('passport-github');
const keys = require('./keys.js');
const UserController = require('../controllers/userController'); // Correct path to your User controller
const { User } = require('../models'); // Import the User model for serialization

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id); // Use findByPk for Sequelize
        done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: keys.github.callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('GitHub profile:', profile); // Debug the profile content
        const user = await UserController.createUser(profile);
        done(null, user);
    } catch (err) {
        console.error('Error in GitHub strategy:', err);
        done(err);
    }
}));

module.exports = passport;
