const { Collection, User } = require('../models');

const CollectionController = {
    async createCollection(req, res) {
        try {
            const { userId, name } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const collection = await Collection.create({ name, userId });
            res.status(201).json(collection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getUserCollections(req, res) {
        try {
            const userId = req.params.userId;
            const collections = await Collection.findAll({ where: { userId } });
            res.json(collections);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = CollectionController;