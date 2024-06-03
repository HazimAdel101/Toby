// const express = require('express');
// const router = express.Router();
// const BookmarkController = require('../controllers/bookmarkController');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads/")
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname)
//     },
// })


// const upload = multer({ storage });

// router.post('/create', upload.single('icon'), BookmarkController.createBookmark);

// module.exports = router;


const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmarkController');
const multer = require('multer');

// Define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Define the file filter function
const imageFileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only images are allowed"));
    }
};

// Configure multer with storage and file filter
const upload = multer({ 
    storage,
    fileFilter: imageFileFilter 
});

// Route for creating a bookmark
router.post('/create', upload.single('icon'), (req, res, next) => {
    BookmarkController.createBookmark(req, res).catch(next);
});

// Error handling middleware for multer errors
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        res.status(400).json({ error: err.message });
    } else if (err) {
        // Handle other errors
        res.status(400).json({ error: err.message });
    } else {
        next();
    }
});

module.exports = router;

