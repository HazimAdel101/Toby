const { Tag, Collection } = require('../models');

const TagController = {
    async createTag(req, res) {
        // try {
        //     const { name, color } = req.body;
        //     const tag = await Tag.create({ name, color });
        //     res.status(201).redirect('/toby');
        // } catch (error) {
        //     res.status(500).redirect('/toby');
        // }

        try {
            const { name, color } = req.body;
            const userId = req.user.id; // Assume req.user is populated

            // Check if a tag with the same name already exists for the user
            const existingTag = await Tag.findOne({
                where: { name, userId }
            });

            if (existingTag) {
                // Tag with the same name already exists for this user
                res.status(400).json({ error: 'Tag with this name already exists for the user.' });
            } else {
                // Create the tag
                const tag = await Tag.create({ name, color, userId });
                res.status(201).redirect('/toby');
            }
        } catch (error) {
            res.status(500).redirect('/toby');
        }
    },


    async getCollectionTags(req, res) {
        //     try {
        //         const collectionId = req.params.collectionId;
        //         const collection = await Collection.findByPk(collectionId, {
        //             include: 'tags'
        //         });

        //         if (collection) {
        //             res.json(collection.tags);
        //         } else {
        //             res.status(404).redirect('/toby');
        //         }
        //     } catch (error) {
        //         res.status(500).redirect('/toby');
        //     }
        // }
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