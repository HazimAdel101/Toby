const { Tag, Collection } = require('../models');

const TagController = {
    async createTag(req, res) {
        try {
            const { name, color } = req.body;
            console.log(color);
            const tag = await Tag.create({ name });
            res.status(201).json(tag);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addTagToCollection(req, res) {
        try {
            const { collectionId, tagId } = req.body;
            const collection = await Collection.findByPk(collectionId);
            const tag = await Tag.findByPk(tagId);

            if (collection && tag) {
                await collection.addTag(tag);
                res.status(200).json({ message: 'Tag added to collection' });
            } else {
                res.status(404).json({ error: 'Collection or Tag not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCollectionTags(req, res) {
        try {
            const collectionId = req.params.collectionId;
            const collection = await Collection.findByPk(collectionId, {
                include: 'tags'
            });

            if (collection) {
                res.json(collection.tags);
            } else {
                res.status(404).json({ error: 'Collection not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = TagController;
