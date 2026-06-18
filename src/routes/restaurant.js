const express = require('express');
const route = express.Router();
const {createRestaurant, getRestaurants}= require('../controllers/restaurant');

route.post('/', createRestaurant);
route.get('/', getRestaurants);

module.exports = route;