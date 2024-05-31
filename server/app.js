import express from 'express';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import passportSetup from './config/passportSetup.js'

const app = express();

// Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false, // HTTP or HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.session());
app.use(passport.initialize());
// Routes

app.get('/', (req, res) => {
    console.log(req.user);
    var name = "hazim";
    var name = req.user;
    if (!name) {
        res.send('User not found');
    } else {
        res.send(`name ${name}`);
    }
})

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;