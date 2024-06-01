import app from './app.js';
import db from './models/index.js';  // Make sure the path is correct
import userRoutes from './routes/user.js';  // Make sure the path is correct
import authRoutes from './routes/auth.js';


app.use('/users', userRoutes);
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
