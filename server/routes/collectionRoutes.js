const { Router } = require('express');
const CollectionController = require('../controllers/collectionController');
const {isAuth} = require('../middleware/auth')

const router = Router();

router.post('/create', isAuth, CollectionController.createCollection);
router.post('/update', isAuth, CollectionController.updateCollection);
router.post('/delete', isAuth, CollectionController.deleteCollection);

module.exports = router;
