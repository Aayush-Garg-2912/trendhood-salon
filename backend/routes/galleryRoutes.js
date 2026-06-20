const express = require('express');
const router = express.Router();
const { addImage, getImages, deleteImage } = require('../controllers/galleryController');

router.post('/add', addImage);
router.get('/get', getImages);
router.delete('/:id', deleteImage);

module.exports = router;
