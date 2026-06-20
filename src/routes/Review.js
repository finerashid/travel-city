const express = require('express');
const router = express.Router();
const {addReview, getReviews, updateReview, deleteReview} = require('../controllers/Review');
const { authenticate } = require("../middlewares/authMiddleware");
const checkOwnership = require("../middlewares/checkOwnership");


router.post('/', authenticate,  addReview);
router.get('/', authenticate,  getReviews);
router.get('/:id', authenticate,  getReviews);
router.put('/:id', authenticate, checkOwnership, updateReview);
router.delete('/:id', authenticate, checkOwnership,  deleteReview);

module.exports = router;