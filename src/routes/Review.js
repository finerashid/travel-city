const express = require('express');
const router = express.Router();
const {addReview, getReviews, updateReview, deleteReview} = require('../controllers/Review');

router.post('/add', addReview);
router.get('/get', getReviews);
router.get('/get/:id', getReviews);
router.put('/update/:id', updateReview);
router.delete('/delete/:id', deleteReview);

module.exports = router;