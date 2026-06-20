const express = require('express');
const router = express.Router();
const { addReview, getApprovedReviews, getAllReviews, updateReviewStatus, deleteReview } = require('../controllers/reviewController');

router.post('/add', addReview);
router.get('/approved', getApprovedReviews);
router.get('/all', getAllReviews);
router.put('/:id/status', updateReviewStatus);
router.delete('/:id', deleteReview);

module.exports = router;
