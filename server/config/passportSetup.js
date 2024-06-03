const passport = require("passport");
const { Strategy: GitHubStrategy } = require('passport-github');
const keys = require('./keys.js');
const { User } = require('../models'); // Import the User model for serialization

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // console.log(`Deserializing user with id: ${id}`);
    try {
        const user = await User.findByPk(id);
        // console.log(`User found: ${user}`);
        done(null, user);
    } catch (error) {
        // console.error(`Error deserializing user: ${error}`);
        done(error);
    }
});

passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: keys.github.callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('GitHub profile:', profile); // Debug the profile content

        // Directly check and create/find user here to avoid loops
        let user = await User.findOne({ where: { githubId: profile.id } });

        if (!user) {
            // console.log('User not found, creating new user.');
            user = await User.create({
                githubId: profile.id,
                firstName: profile.displayName || 'First Name',
                lastName: profile.username || 'Last Name',
                email: profile.emails && profile.emails[0] ? profile.emails[0].value : 'noemail@example.com',
                password: '123456' // Consider using a more secure method for password
            });
            // console.log('User created:', user);
        } else {
            // console.log('User found:', user);
        }

        done(null, user);
    } catch (err) {
        console.error('Error in GitHub strategy:', err);
        done(err);
    }
}));

module.exports = passport;
