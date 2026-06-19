const Mosque = require("../models/Mosque");
const City = require("../models/City")
const Country = require("../models/Country")
const mongoose = require("mongoose");

let sendRes = {
    success: false,
    message: 'Something went wrong',
    data: null
}
const addMosque = async (req, res) => {
    try {
        let mosqueDetails = req.body;

        if (!mosqueDetails || !mosqueDetails.name ||!mosqueDetails.city ||!mosqueDetails.country) 
            {
            return res.status(400).send({
                success: false,
                message: "Required Params missing",
                data: null,
            });
        }

        let createMosque = {
            name:mosqueDetails.name,
            city:mosqueDetails.city,
            country:mosqueDetails.country
        }
    
        if(mosqueDetails.address){
            createMosque.address = mosqueDetails.address
        }
    
        if(mosqueDetails.location){
            createMosque.location = mosqueDetails.location
        }
        if(mosqueDetails.capacity){
            createMosque.capacity= mosqueDetails.capacity
        }
        if(mosqueDetails.sect){
            createMosque.sect= mosqueDetails.sect
        }
        if(mosqueDetails.facilities){
            createMosque.facilities = mosqueDetails.facilities
        }
        if(mosqueDetails.jummahTime){
            createMosque.jummahTime = mosqueDetails.jummahTime
        }
        if(mosqueDetails.description){
            createMosque.description = mosqueDetails.description
        }
        if(mosqueDetails.images){
            createMosque.images = mosqueDetails.images
        }
        let mosqueDbRes = await Mosque.create(createMosque)
    
        if(mosqueDbRes){
            sendRes.success = true
            sendRes.message = "Mosque added successfully!"
            sendRes.data = mosqueDbRes
            return res.status(200).send(sendRes)
        }
    } catch (error) {
        console.log("Error in adding Mosque", error)
        return res.status(500).send(sendRes)
    }
}

const getMosques = async (req, res) => {
    try {
        const mosques = await Mosque.find()
            .populate("city")
            .populate("country");

        return res.status(200).send({
            success: true,
            message: "Mosques fetched successfully",
            data: mosques
        });
    } catch (error) {
        console.log("Error fetching mosques:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const getMosqueById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid Mosque ID",
                data: null
            });
        }

        const mosqueData = await Mosque.findById(id)
            .populate("city")
            .populate("country");

        if (!mosqueData) {
            return res.status(404).send({
                success: false,
                message: "Mosque not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Mosque fetched successfully",
            data: mosqueData
        });

    } catch (error) {
        console.log("Error fetching mosque:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const updateMosque = async (req, res) => {
    try {
        const { id } = req.params;

        const updateResult = await Mosque.updateOne(
            { _id: id },
            { $set: req.body }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Mosque not found",
                data: null
            });
        }

        const updatedMosque = await Mosque.findById(id);

        return res.status(200).send({
            success: true,
            message: "Mosque updated successfully",
            data: updatedMosque
        });
    } catch (error) {
        console.log("Error updating mosque:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};
const deleteMosque = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteResult = await Mosque.deleteOne({ _id: id });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).send({
                success: false,
                message: "Mosque not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Mosque deleted successfully",
            data: null
        });
    } catch (error) {
        console.log("Error deleting mosque:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};


module.exports = {addMosque,getMosques,getMosqueById,updateMosque,deleteMosque}