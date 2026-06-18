const express = require('express');
const router = express.Router();
const {addReview, getReviews, updateReview} = require('../controllers/Review');

router.post('/add', addReview);
router.get('/get', getReviews);
router.get('/get/:id', getReviews);
router.put('/update/:id', updateReview);

module.exports = router;