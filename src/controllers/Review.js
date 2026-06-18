const review = require('../models/Review');

let sendRes = {
    success: false,
    message: 'Something went wrong',
    data: null
}
const addReview = async (req, res) => {
    try {
        let newReview = req.body;
        if (!newReview || !newReview.user || !newReview.targetType || !newReview.targetId || !newReview.rating) {
            sendRes.message = 'Please provide all required fields';
            return res.status(400).json(sendRes);
        }
        let createdReview = {
            user: newReview.user,
            targetType: newReview.targetType,
            targetId: newReview.targetId,
            rating: newReview.rating,
        }
        if(newReview.comment) {
            createdReview.comment = newReview.comment;
        }
        if(newReview.images) {
            createdReview.images = newReview.images;
        }
        const savedReview = await review.create(createdReview);
        if (savedReview) {
        sendRes.success = true;
        sendRes.message = 'Review added successfully';
        sendRes.data = savedReview;
        return res.status(200).json(sendRes);
        }
    } catch (error) {
        console.log("error while adding review: ", error);
        return res.status(500).json(sendRes);
    }
};
const getReviews = async (req, res) => {
    try {
        const reviews = await review.find();
        sendRes.success = true;
        sendRes.message = 'Reviews retrieved successfully';
        sendRes.data = reviews;
        return res.status(200).json(sendRes);
        } catch (error) {
            console.log("error while retrieving reviews: ", error);
            return res.status(500).json(sendRes);
        }
    };

module.exports = {
    addReview,
    getReviews
};