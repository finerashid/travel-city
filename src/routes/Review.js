const express = require('express');
const router = express.Router();
const {addReview, getReviews} = require('../controllers/Review');

router.post('/add', addReview);
router.get('/get', getReviews);

module.exports = router;