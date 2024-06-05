const { Router } = require('express');
const TagController = require('../controllers/tagController');
const CollectionController = require('../controllers/collectionController');
const {isAuth} = require('../middleware/auth')

const router = Router();

router.post('/create', isAuth, TagController.createTag);
router.post('/collections/tags', isAuth, CollectionController.addTagToCollection);

module.exports = router;
