import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github';
import keys from './keys.js';

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
})

passport.use(new GitHubStrategy({
    clientID: keys.github.clientID,
    clientSecret: keys.github.clientSecret,
    callbackURL: keys.github.callbackURL
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        console.log(profile);
        cb(null, profile);
    } catch (err) {
        console.log(err);;
    }
}));

export default passport;
