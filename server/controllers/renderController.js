const { Collection } = require('../models');

exports.renderMainPage = async (req, res) => {
    try {
        // Fetch all collections from the database
        const collections = await Collection.findAll();

        // Render the template with user and collections data
        res.render('toby', { user: req.user, collections: collections });
    } catch (error) {
        // Handle any errors
        console.error('Error fetching collections:', error);
        res.status(500).send('Internal Server Error');
    }
};

// exports.renderMainPage = (req, res) => {
//     res.render('toby', { user: req.user });
// };