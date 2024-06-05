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

        const tags = await Tag.findAll();
        console.log('Collections:', JSON.stringify(collections, null, 2));
        console.log('Tags:', JSON.stringify(tags, null, 2));
        res.render('toby', { user: req.user, collections: collections, tags: tags });
    } catch (error) {
        console.error('Error fetching collections and bookmarks:', error);
        res.status(500).send('Internal Server Error');
    }
};
