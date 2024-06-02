const { Router } = require('express');
const CollectionController = require('../controllers/collectionController');

const router = Router();

router.post('/collections', CollectionController.createCollection);
router.get('/users/:userId/collections', CollectionController.getUserCollections);

module.exports = router;
