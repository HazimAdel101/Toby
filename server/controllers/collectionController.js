const { Collection, User, Bookmark, Tag } = require('../models');

const CollectionController = {
    async createCollection(req, res) {
        try {
            const { userId, name, description } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const collection = await Collection.create({ name, userId, description });
            res.status(201).redirect('/toby');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getUserCollections(req, res) {
        try {
            const userId = req.params.userId;
            console.log(`userId ${userId}`);
            const collections = await Collection.findAll({ where: { userId } });
            res.json(collections);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCollection(req, res) {
        try {
            const { id, name, description } = req.body;
            await Collection.update({ name, description }, {
                where: { id }
            });

            res.redirect('/toby');
        } catch (error) {
            console.error('Error updating collection:', error);
            res.status(500).send('Server Error');
        }
    },
    async deleteCollection(req, res) {
        try {
            const { id } = req.body;

            await Bookmark.destroy({
                where: { collectionId: id }
            });

            await Collection.destroy({
                where: { id }
            });

            res.redirect('/toby');
        } catch (error) {
            console.error('Error deleting collection:', error);
            res.status(500).send('Server Error');
        }
    },

    async addTagToCollection(req, res) {
        try {
            const { collectionId, tagId } = req.body;
            const collection = await Collection.findByPk(collectionId);
            const tag = await Tag.findByPk(tagId);
    
            if (collection && tag) {
                await collection.addTag(tag);
                res.status(200).redirect('/toby');
            } else {
                res.status(404).redirect('/toby');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = CollectionController;