const { Bookmark, Collection } = require('../models');

const BookmarkController = {
    async createBookmark(req, res) {
        try {
            const { name, url, collectionId } = req.body;
            const icon = req.file ? req.file.filename : null;
            const bookmark = await Bookmark.create({
                name,
                url,
                icon,
                collectionId
            });
            res.status(201).json(bookmark);
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
    },
    async updateBookmark(req, res) {
        try {

            const { id, name, url } = req.body;
            const icon = req.file ? req.file.filename : null;

            const bookmark = await Bookmark.findByPk(id);
            // the resource might be unavaialble due to other person delete 
            if (!bookmark) {
                return res.status(404).redirect('/toby');
            }

            bookmark.name = name;
            bookmark.url = url;

            if (icon) {
                bookmark.icon = icon;
            }

            await bookmark.save();

            res.status(200).redirect('/toby');
        } catch (error) {
            console.error('Error updating bookmark:', error);
            res.status(500).json({ error: 'Failed to update bookmark' });
        }
    },
    async deleteBookmark(req, res) {
        try {
            const { id } = req.body;
            console.log('ID:', id);
            await Bookmark.destroy({
                where: { id }
            });

            res.redirect('/toby');
        } catch (error) {
            console.error('Error deleting bookmark:', error);
            res.status(500).send('Server Error');
        }
    }
};

module.exports = BookmarkController;