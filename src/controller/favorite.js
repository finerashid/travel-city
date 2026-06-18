const Favorite = require("../models/Favorite");

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

module.exports = {addFavorite,getFavorites}