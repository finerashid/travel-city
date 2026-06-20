const TravelItinerary = require("../models/TravelItinerary");
const Place = require("../models/Place")
const City = require("../models/City")
const Country = require("../models/Country")
const User = require("../models/User")


const addItinerary = async (req, res) => {
  try {
    let body = req.body;

    if (!body || !body.title || !body.user || !body.country) {
      return res.status(400).send({
        success: false,
        message: "Required parameters missing",
      });
    }

    let itineraryData = {
      title: body.title,
      user: body.user,
      country: body.country,
    };

    if (body.cities) itineraryData.cities = body.cities;
    if (body.startDate) itineraryData.startDate = body.startDate;
    if (body.endDate) itineraryData.endDate = body.endDate;
    if (body.budget) itineraryData.budget = body.budget;
    if (body.days) itineraryData.days = body.days;
    if (body.isPublic !== undefined) itineraryData.isPublic = body.isPublic;

    let dbRes = await TravelItinerary.create(itineraryData);

    return res.status(201).send({
      success: true,
      message: "Itinerary created successfully!",
      data: dbRes,
    });

  } catch (error) {
    console.log("Error in creating itinerary", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

const getItinerary = async (req, res) => {
  try {
    let body = req.body;
    let filter = {};

    if (body.title) {
      filter.title = { $regex: body.title, $options: "i" };
    }

    if (body.user) {
      filter.user = body.user;
    }

    if (body.country) {
      filter.country = body.country;
    }

    if (body.budget) {
      filter.budget = body.budget;
    }


    if (body.isPublic !== undefined) {
      filter.isPublic = body.isPublic;
    }

    if (body.dayCity) {
      filter["days.city"] = body.dayCity;
    }

    if (body.dayNumber) {
      filter["days.dayNumber"] = body.dayNumber;
    }

    // Query with populate
    let dbRes = await TravelItinerary.find(filter)
      .populate("user")
      .populate("country")
      .populate("cities")
      .populate("days.city");

    if (dbRes.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Itineraries fetched successfully!",
        data: dbRes,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No itineraries found",
      });
    }

  } catch (error) {
    console.log("Error in get itinerary", error);
    return res.status(500).send({
      success: false,
      message: "Server error",
    });
  }
};

const getItineraryById = async (req, res) => {
  try {
    const id = req.params.id;

    let dbRes = await TravelItinerary.findById(id)
      .populate("user")
      .populate("country")
      .populate("cities")
      .populate("days.city");

    if (!dbRes) {
      return res.status(404).send({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Itinerary fetched successfully!",
      data: dbRes,
    });

  } catch (error) {
    console.log("Error in get by id", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

const updateItineraryById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    let updated = await TravelItinerary.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    )
      .populate("user")
      .populate("country")
      .populate("cities")
      .populate("days.city");

    if (!updated) {
      return res.status(404).send({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Itinerary updated successfully!"
    });

  } catch (error) {
    console.log("Error in update itinerary", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

const deleteItineraryById = async (req, res) => {
  try {
    const id = req.params.id;

    let deleted = await TravelItinerary.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Itinerary deleted successfully!",
    });

  } catch (error) {
    console.log("Error in delete itinerary", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

module.exports = { addItinerary, getItinerary, getItineraryById, updateItineraryById, deleteItineraryById }