const { Collection, Bookmark } = require('../models');

exports.renderMainPage = async (req, res) => {
    try {
        // Fetch all collections and their bookmarks from the database
        const collections = await Collection.findAll({
            include: {
                model: Bookmark,
                as: 'bookmarks'
            }
        });

        // Render the template with user and collections data
        res.render('toby', { user: req.user, collections: collections });
    } catch (error) {
        // Handle any errors
        console.error('Error fetching collections and bookmarks:', error);
        res.status(500).send('Internal Server Error');
    }
};
