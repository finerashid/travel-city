const Favorite = require("../models/Favorite");
const User = require("../models/User")
const mongoose = require("mongoose");
let sendRes = {
    success: false,
    message: 'Something went wrong',
    data: null
}
const addFavorite= async (req, res) => {
    try {
        let favoriteDetails = req.body;

        if (!favoriteDetails || !favoriteDetails.user ||!favoriteDetails.itemType) 
            {
            return res.status(400).send({
                success: false,
                message: "Required Params missing",
                data: null,
            });
        }

        let createFavorite = {
            user:favoriteDetails.user,
            itemType:favoriteDetails.itemType
        }
    
        if(favoriteDetails.notes){
            createFavorite.notes = favoriteDetails.notes
        }
    
        let favoriteDbRes = await Favorite.create(createFavorite)
    
        if(favoriteDbRes){
            sendRes.success = true
            sendRes.message = "Favorite added successfully!"
            sendRes.data = favoriteDbRes
            return res.status(200).send(sendRes)
        }
    } catch (error) {
        console.log("Error in adding Favorite", error)
        return res.status(500).send(sendRes)
    }
}
const getFavorites = async (req, res) => {
    try {
        const favorite = await Favorite.find()
            .populate("user");

        return res.status(200).send({
            success: true,
            message: "Favorites fetched successfully",
            data: favorite
        });
    } catch (error) {
        console.log("Error fetching favorites:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const getFavoritesById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Favorites ID",
                data: null
            });
        }

        const favoriteData = await Favorite.findById(id)
            .populate("user");

        if (!favoriteData) {
            return res.status(404).send({
                success: false,
                message: "Favorite not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Favorite fetched successfully",
            data: favoriteData
        });

    } catch (error) {
        console.log("Error fetching favorites:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const updateFavoritesById = async (req, res) => {
    try {
        const { id } = req.params;

        const updateResult = await Favorite.updateOne(
            { _id: id },
            { $set: req.body }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Favorites not found",
                data: null
            });
        }

        const updatedFavorite = await Favorite.findById(id);

        return res.status(200).send({
            success: true,
            message: "Mosque updated successfully",
            data: updatedFavorite
        });
    } catch (error) {
        console.log("Error updating Favorites:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const deleteFavoriteById = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteResult = await Favorite.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Favorite not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Favorite deleted successfully",
            data: null
        });
    } catch (error) {
        console.log("Error deleting Favorite:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
module.exports = {addFavorite,getFavorites,getFavoritesById,updateFavoritesById,deleteFavoriteById}