const { Tag, Collection } = require('../models');

const TagController = {
    async createTag(req, res) {
        try {
            const { name, color } = req.body;
            const tag = await Tag.create({ name, color });
            res.status(201).redirect('/toby');
        } catch (error) {
            res.status(500).redirect('/toby');
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
                res.status(404).redirect('/toby');
            }
        } catch (error) {
            res.status(500).redirect('/toby');
        }
    }
};
module.exports = TagController;