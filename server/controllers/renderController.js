const { Collection, Bookmark, Tag } = require('../models');

exports.renderMainPage = async (req, res) => {
    try {
        const collections = await Collection.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Bookmark,
                    as: 'bookmarks'
                },
                {
                    model: Tag,
                    as: 'tags'
                }
            ]
        });

        const tags = await Tag.findAll({
            where: { userId: req.user.id }
        });

        const collectionCount = await Collection.count({
            where: { userId: req.user.id }
        });

        res.render('toby', { user: req.user, collections, tags, collectionCount });
    } catch (error) {
        console.error('Error fetching collections and bookmarks:', error);
        res.status(500).send('Internal Server Error');
    }
};
