const { Collection, User } = require('../models');

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
            
            // Find the collection by id and delete it
            await Collection.destroy({
                where: { id }
            });
    
            res.redirect('/toby');
        } catch (error) {
            console.error('Error deleting collection:', error);
            res.status(500).send('Server Error');
        }
    }    
    
};

module.exports = CollectionController;