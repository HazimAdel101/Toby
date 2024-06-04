const { Router } = require('express');
const TagController = require('../controllers/tagController');

const router = Router();

router.post('/create', TagController.createTag);
router.post('/collections/tags', TagController.addTagToCollection);
router.get('/collections/:collectionId/tags', TagController.getCollectionTags);

module.exports = router;
