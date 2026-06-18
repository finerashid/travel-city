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

module.exports = {
    createRestaurant,
};