const City = require("../models/City");

const createCity = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    const city = await City.create(req.body);
    sendRes.success = true;
    sendRes.message = "City created successfully";
    sendRes.data = city;
    return res.status(201).send(sendRes);
  } catch (error) {
    console.log("Error in creating city", error);
    return res.status(500).send(sendRes);
  }
};

const getCities = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    const cities = await City.find();
    sendRes.success = true;
    sendRes.message = "Cities fetched successfully";
    sendRes.data = cities;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in getting cities", error);
    return res.status(500).send(sendRes);
  }
};

const getCityById = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    if (!req.params.id) {
      sendRes.message = "ID is required";
      return res.status(400).send(sendRes);
    }
    const city = await City.findById(req.params.id);
    if (!city) {
      sendRes.message = "City not found";
      return res.status(404).send(sendRes);
    }
    sendRes.success = true;
    sendRes.message = "City fetched successfully";
    sendRes.data = city;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in getting city", error);
    return res.status(500).send(sendRes);
  }
};

const updateCity = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    if (!req.params.id) {
      sendRes.message = "ID is required";
      return res.status(400).send(sendRes);
    }
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!city) {
      sendRes.message = "City not found";
      return res.status(404).send(sendRes);
    }
    sendRes.success = true;
    sendRes.message = "City updated successfully";
    sendRes.data = city;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in updating city", error);
    return res.status(500).send(sendRes);
  }
};

const deleteCity = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    if (!req.params.id) {
      sendRes.message = "ID is required";
      return res.status(400).send(sendRes);
    }
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      sendRes.message = "City not found";
      return res.status(404).send(sendRes);
    }
    sendRes.success = true;
    sendRes.message = "City deleted successfully";
    sendRes.data = null;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in deleting city", error);
    return res.status(500).send(sendRes);
  }
};

module.exports = {
  createCity,
  getCities,
  getCityById,
  updateCity,
  deleteCity,
};