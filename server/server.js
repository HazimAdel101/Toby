const app = require('./app.js');
const db = require('./models/index.js');  // Make sure the path is correct
const userRoutes = require('./routes/user.js');  // Make sure the path is correct
const authRoutes = require('./routes/auth.js');
const mainRoutes = require('./routes/index.js');
const collectionRoutes = require('./routes/collectionRoutes.js')

// Routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/collections', collectionRoutes);
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
