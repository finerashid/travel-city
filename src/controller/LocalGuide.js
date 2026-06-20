const LocalGuide = require('../models/LocalGuide')
const City = require('../models/City')
const User = require('../models/User')
// add
const addLocalGuide = async (req, res) => {
    try {
      let giveRes = {
    success: false,
    message: "Something went wrong",
    data: null
}

        let localGuideDetails = req.body

        if (!localGuideDetails || !localGuideDetails.user || !localGuideDetails.city) {

            giveRes.message = "Required Params Missing"

            return res.status(400).send(giveRes)
        }

        let createLocalGuide = {
            user: localGuideDetails.user,
            city: localGuideDetails.city
        }

        if (localGuideDetails.languages) {
            createLocalGuide.languages = localGuideDetails.languages
        }

        if (localGuideDetails.bio) {
            createLocalGuide.bio = localGuideDetails.bio
        }

        if (localGuideDetails.expertise) {
            createLocalGuide.expertise = localGuideDetails.expertise
        }

        if (localGuideDetails.hourlyRate) {
            createLocalGuide.hourlyRate = localGuideDetails.hourlyRate
        }

        if (localGuideDetails.currency) {
            createLocalGuide.currency = localGuideDetails.currency
        }

        if (localGuideDetails.availableDays) {
            createLocalGuide.availableDays = localGuideDetails.availableDays
        }

        if (localGuideDetails.contactWhatsapp) {
            createLocalGuide.contactWhatsapp = localGuideDetails.contactWhatsapp
        }

        if (localGuideDetails.rating) {
            createLocalGuide.rating = localGuideDetails.rating
        }

        let localGuideDbRes = await LocalGuide.create(createLocalGuide)

        if (localGuideDbRes) {

            giveRes.success = true
            giveRes.message = "Local Guide Added Successfully!"
            giveRes.data = localGuideDbRes

            return res.status(201).send(giveRes)
        }

    } catch (error) {

        console.log("Error in adding Local Guide", error)

        giveRes.success = false
        giveRes.message = error.message

        return res.status(500).send(giveRes)
    }
}
const getAllLocalGuides = async (req, res) => {
    let giveRes = {
        success: false,
        message: "Something went wrong",
        data: null
    }

    try {
        let localGuideDetails = req.body

        let filterLocalGuide = {}

        if (localGuideDetails.user) {
            filterLocalGuide.user = localGuideDetails.user
        }

        if (localGuideDetails.city) {
            filterLocalGuide.city = localGuideDetails.city
        }
         if (localGuideDetails.languages) {
            filterLocalGuide.languages = localGuideDetails.languages
        }

        let localGuideDbRes = await LocalGuide.find(filterLocalGuide)
            

        giveRes.success = true
        giveRes.message = "Local Guides fetched successfully!"
        giveRes.data = localGuideDbRes

        return res.status(200).send(giveRes)

    } catch (error) {
        console.log("Error in getting Local Guides", error)

        giveRes.success = false
        giveRes.message = error.message

        return res.status(500).send(giveRes)
    }
}
const getLocalGuideById = async (req, res) => {

    let giveRes = {
        success: false,
        message: "Something went wrong",
        data: null
    }

    try {

        let localGuideId = req.params.id

        if (!localGuideId) {

            giveRes.message = "Local Guide Id is required"

            return res.status(400).send(giveRes)
        }

        let localGuideDbRes = await LocalGuide.findById(localGuideId)

        if (!localGuideDbRes) {

            giveRes.message = "Local Guide not found"

            return res.status(404).send(giveRes)
        }

        giveRes.success = true
        giveRes.message = "Local Guide fetched successfully!"
        giveRes.data = localGuideDbRes

        return res.status(200).send(giveRes)

    } catch (error) {

        console.log("Error in getting Local Guide", error)

        giveRes.message = error.message

        return res.status(500).send(giveRes)
    }
}
const updateLocalGuide = async (req, res) => {
    let giveRes = {
        success: false,
        message: "Something went wrong",
        data: null
    }

    try {
        let guideDetails = req.body

        if (!guideDetails || !guideDetails._id) {
            giveRes.message = "Guide ID Required"
            return res.status(400).send(giveRes)
        }

        let guideDB = await LocalGuide.findByIdAndUpdate(
            guideDetails._id,
            guideDetails,
            {
                new: true
            }
        )

        if (!guideDB) {
            giveRes.message = "Local Guide not found"
            return res.status(404).send(giveRes)
        }

        giveRes.success = true
        giveRes.message = "Local Guide Updated Successfully!"
        giveRes.data = guideDB

        return res.status(200).send(giveRes)

    } catch (error) {
        console.log("Error in updating local guide", error)

        giveRes.success = false
        giveRes.message = error.message

        return res.status(500).send(giveRes)
    }
}
const deleteLocalGuide = async (req, res) => {

    let giveRes = {
        success: false,
        message: "Something went wrong",
        data: null
    }

    try {

        let localGuideId = req.params.id

        if (!localGuideId) {

            giveRes.message = "Local Guide ID Required"

            return res.status(400).send(giveRes)
        }

        let localGuideDbRes = await LocalGuide.findByIdAndDelete(localGuideId)

        if (!localGuideDbRes) {

            giveRes.message = "Local Guide Not Found"

            return res.status(404).send(giveRes)
        }

        giveRes.success = true
        giveRes.message = "Local Guide Deleted Successfully!"
        giveRes.data = localGuideDbRes

        return res.status(200).send(giveRes)

    } catch (error) {

        console.log("Error in deleting local guide", error)

        giveRes.message = error.message

        return res.status(500).send(giveRes)
    }
}



module.exports = {
  addLocalGuide,
  getAllLocalGuides,
 getLocalGuideById,
  updateLocalGuide,
  deleteLocalGuide
}