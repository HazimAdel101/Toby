// const isAuth = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// };

// module.exports = {
//     isAuth,
// };


const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = { isAuth };
