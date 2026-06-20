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
    let reviewId = req.params.id;
            if (reviewId) {
                const foundReview = await review.findById(reviewId).populate('user', 'name email');
                sendRes.success = true;
                sendRes.message = 'Review retrieved by ID successfully';
                sendRes.data = foundReview;
                return res.status(200).json(sendRes);
            }
    try {
        const reviews = await review.find().populate('user', 'name email');
        sendRes.success = true;
        sendRes.message = 'Reviews retrieved successfully';
        sendRes.data = reviews;
        return res.status(200).json(sendRes);
        } catch (error) {
            console.log("error while retrieving reviews: ", error);
            return res.status(500).json(sendRes);
        }
    };
const updateReview = async (req, res) => {
    try {
        let reviewId = req.params.id;
        let updatedReview = req.body;

        const foundReview = await review.findById(reviewId);
        if (!foundReview) {
            sendRes.message = 'Review not found';
            return res.status(404).json(sendRes);
        }

        const updated = await review.findByIdAndUpdate(reviewId, updatedReview, { new: true, runValidators: true });
        sendRes.success = true;
        sendRes.message = 'Review updated successfully';
        sendRes.data = updated;
        return res.status(200).json(sendRes);
    } catch (error) {
        console.log("error while updating review: ", error);
        return res.status(500).json(sendRes);
    }
};

const deleteReview = async (req, res) => {
    try {
        let reviewId = req.params.id;
        const deletedReview = await review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            sendRes.success = false;
            sendRes.message = 'Review not found';
            return res.status(404).json(sendRes);
        }

        sendRes.success = true;
        sendRes.message = 'Review deleted successfully';
        sendRes.data = deletedReview;
        return res.status(200).json(sendRes);
    } catch (error) {
        console.log("error while deleting review: ", error);
        return res.status(500).json(sendRes);
    }
};

module.exports = {
    addReview,
    getReviews,
    updateReview,
    deleteReview
};