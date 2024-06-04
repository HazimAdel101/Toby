const app = require('./app.js');
const db = require('./models/index.js');
const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');
const mainRoutes = require('./routes/index.js');
const collectionRoutes = require('./routes/collectionRoutes.js')
const bookmarkRoutes = require('./routes/bookmarkRoutes.js')
const tagRoutes = require('./routes/tagRoutes.js')

// Routes
app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/collections', collectionRoutes);
app.use('/bookmarks', bookmarkRoutes);
app.use('/tags', tagRoutes);
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});