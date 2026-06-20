const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    const restaurant = await Restaurant.create(req.body);
    sendRes.success = true;
    sendRes.message = "Restaurant created successfully";
    sendRes.data = restaurant;
    return res.status(201).send(sendRes);
  } catch (error) {
    console.log("Error in creating restaurant", error);
    return res.status(500).send(sendRes);
  }
};


const getRestaurants = async (req, res) => {
  let sendRes = {
    success: false,
    message: "Something went wrong",
    data: null,
  };
  try {
    const restaurants = await Restaurant.find();
    sendRes.success = true;
    sendRes.message = "Restaurants fetched successfully";
    sendRes.data = restaurants;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in getting restaurants", error);
    return res.status(500).send(sendRes);
  }
};


const getRestaurantById = async (req, res) => {
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
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      sendRes.message = "Restaurant not found";
      return res.status(404).send(sendRes);
    }
    sendRes.success = true;
    sendRes.message = "Restaurant fetched successfully";
    sendRes.data = restaurant;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in getting restaurant", error);
    return res.status(500).send(sendRes);
  }
};


const updateRestaurant = async (req, res) => {
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
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!restaurant) {
      sendRes.message = "Restaurant not found";
      return res.status(404).send(sendRes);
    }
    sendRes.success = true;
    sendRes.message = "Restaurant updated successfully";
    sendRes.data = restaurant;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in updating restaurant", error);
    return res.status(500).send(sendRes);
  }
};



const deleteRestaurant = async (req, res) => {
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
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      sendRes.message = "Restaurant not found";
      return res.status(404).send(sendRes);
    }
    sendRes.success = true;
    sendRes.message = "Restaurant deleted successfully";
    sendRes.data = null;
    return res.status(200).send(sendRes);
  } catch (error) {
    console.log("Error in deleting restaurant", error);
    return res.status(500).send(sendRes);
  }
};


module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};