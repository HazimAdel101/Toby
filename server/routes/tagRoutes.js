const { Router } = require('express');
const TagController = require('../controllers/tagController');
const CollectionController = require('../controllers/collectionController');

const router = Router();

router.post('/create', TagController.createTag);
router.post('/collections/tags', CollectionController.addTagToCollection);

module.exports = router;
