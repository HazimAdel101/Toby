// controllers/bookmarkController.js
const { Bookmark, Collection } = require('../models');

const BookmarkController = {
    async createBookmark(req, res) {
        try {
            const { collectionId, name, url, icon } = req.body;
            const collection = await Collection.findByPk(collectionId);
            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' });
            }
            const bookmark = await Bookmark.create({ name, url, icon, collectionId });
            res.status(201).json(bookmark);
        } catch (error) {
            res.status(500).json({ error: error.message });
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
