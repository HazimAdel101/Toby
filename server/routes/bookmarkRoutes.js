const { Router } = require('express');
const BookmarkController = require('../controllers/bookmarkController');

const router = Router();

router.post('/bookmarks', BookmarkController.createBookmark);
router.get('/collections/:collectionId/bookmarks', BookmarkController.getCollectionBookmarks);

module.exports = router;