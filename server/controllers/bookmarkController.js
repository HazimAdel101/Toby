const { Bookmark, Collection } = require('../models');

const BookmarkController = {
    async createBookmark(req, res) {
        try {
            const { name, url, collectionId } = req.body;
            const icon = req.file ? req.file.filename : null;
            console.log(`icon ${icon}`);
            console.log('req.file:', req.file); // Log the req.file object
            console.log('Bookmark data:', { name, url, icon, collectionId });
            const bookmark = await Bookmark.create({
                name,
                url,
                icon,
                collectionId
            });
            res.status(201).json(bookmark); // Return the created bookmark
        } catch (error) {
            console.error('Error creating bookmark:', error);
            res.status(500).json({ error: 'Failed to create bookmark' });
        }
    },

    async getCollectionBookmarks(req, res) {
        try {
            const collectionId = req.params.collectionId;
            const bookmarks = await Bookmark.findAll({ where: { collectionId } });
            res.json(bookmarks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = BookmarkController;
