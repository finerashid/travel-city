const Place = require("../models/Place")
const City = require("../models/City")
const Country = require("../models/Country")

let sendRes = {
    success: false,
    message: "Something went wrong",
    data: {}
}

const addPlace = async (req, res) => {
    try {
        let placeDetails = req.body

        if (!placeDetails || !placeDetails.name || !placeDetails.city || !placeDetails.country) {
            sendRes.message = "Required Parameters are missing";
            return res.status(400).send(
                sendRes
            )
        }
        letcreatePlace = {
            city: placeDetails.city,
            name: placeDetails.name,
            country: placeDetails.country
        }
        if (placeDetails.category) {
            createPlace.category = placeDetails.category
        }
        if (placeDetails.description) {
            createPlace.description = placeDetails.description
        }
        if (placeDetails.address) {
            createPlace.address = placeDetails.address
        }
        if (placeDetails.location) {
            createPlace.location = placeDetails.location
        }
        if (placeDetails.entryFee) {
            createPlace.entryFee = placeDetails.entryFee
        }
        if (placeDetails.openingHours) {
            createPlace.openingHours = placeDetails.openingHours
        }
        if (placeDetails.images) {
            createPlace.images = placeDetails.images
        }
        if (placeDetails.tags) {
            createPlace.tags = placeDetails.tags
        }

        let placeDbRes = await Place.create(placeDetails)

        if (placeDbRes) {
            sendRes.success = true
            sendRes.message = "Place added succesfully"
            sendRes.data = placeDbRes
            return res.status(201).send(sendRes)
        }
    } catch (err) {
        console.log("error in getting place", err)
        return res.status(500).send(sendRes)
    }
}

const getPlace = async (req, res) => {
    try {
        let body = req.body;

        //dynamic filter object
        let filter = {};

        if (body.city) {
            filter.city = body.city;
        }

        if (body.name) {
            filter.name = { $regex: body.name, $options: "i" };
        }

        if (body.country) {
            filter.country = body.country;
        }

        if (body.category) {
            filter.category = body.category;
        }

        if (body.description) {
            filter.description = body.description;
        }

        if (body.address) {
            filter.address = body.address;
        }

        if (body.location) {
            filter.location = body.location;
        }

        if (body.entryFee) {
            filter.entryFee = body.entryFee;
        }

        if (body.openingHours) {
            filter.openingHours = body.openingHours;
        }

        if (body.images) {
            filter.images = body.images
        }

        if (body.tags) {
            filter.tags = body.tags
        }

        let placeDbRes = await Place.find(filter).populate("city").populate("country");

        if (placeDbRes.length > 0) {
            sendRes.success = true;
            sendRes.message = "Places fetched successfully!";
            sendRes.data = placeDbRes;
            return res.status(200).send(sendRes);
        } else {
            return res.status(404).send({
                success: false,
                message: "No places found"
            });
        }

    } catch (error) {
        console.log("Error in getting places", error);
        return res.status(500).send(sendRes);
    }
};

const getPlaceById = async (req, res) => {
    try {
        const placeId = req.params.id;

        const placeDbRes = await Place.findById(placeId).populate("city").populate("country");

        if (!placeDbRes) {
            return res.status(404).send({
                success: false,
                message: "Place not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Place fetched successfully!",
            data: placeDbRes,
        });

    } catch (error) {
        console.log("Error in getting place by ID", error);
        return res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
};

const updatePlaceById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const updatedPlace = await Place.findByIdAndUpdate(id, { $set: updateData }, { new: true })
            .populate("city")
            .populate("country");

        console.log("aaaaaaaaa", updatedPlace)

        if (!updatedPlace) {
            return res.status(404).send({
                success: false,
                message: "Place not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Place updated successfully!",
        });

    } catch (error) {
        console.log("Error in updating place", error);
        return res.status(500).send({
            success: false,
            message: "Server error",
        });
    }
};

const deletePlaceById = async (req, res) => {
    try {
        const id = req.params.id;

        console.log("aaaaaaaaa", id)

        let filterPlace = {}

        if (id) {
            filterPlace._id = id
        }

        console.log("bbbbbbbb", filterPlace)

        let placeDbRes = await Place.deleteOne(filterPlace)

        if (placeDbRes.deletedCount !== 0) {
            sendRes.success = true
            sendRes.message = "Places deleted successfully!"
            return res.status(200).send(sendRes)
        } else {
            return res.status(404).send({
                success: false,
                message: "Invalid Place Id"
            })
        }
    } catch (error) {
        console.log("Error in deleting places", error)
        return res.status(500).send(sendRes)
    }
}

module.exports =
    { addPlace, getPlace, getPlaceById, updatePlaceById, deletePlaceById }