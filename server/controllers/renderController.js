const { Collection, Bookmark } = require('../models');

exports.renderMainPage = async (req, res) => {
    try {
        const collections = await Collection.findAll({
            where: { userId: req.user.id },
            include: {
                model: Bookmark,
                as: 'bookmarks'
            }
        });

        res.render('toby', { user: req.user, collections: collections });
    } catch (error) {
        // Handle any errors
        console.error('Error fetching collections and bookmarks:', error);
        res.status(500).send('Internal Server Error');
    }
};