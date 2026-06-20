const express = require('express');
const router = express.Router();
const {addReview, getReviews, updateReview, deleteReview} = require('../controllers/Review');
const { authenticate } = require("../middlewares/authMiddleware");

router.post('/', authenticate,  addReview);
router.get('/', authenticate,  getReviews);
router.get('/:id', authenticate,  getReviews);
router.put('/:id', authenticate,  updateReview);
router.delete('/:id', authenticate,  deleteReview);

module.exports = router;