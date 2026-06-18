const express = require('express');
const route = express.Router();
const {createRestaurant}= require('../controllers/restaurant');

route.post('/', createRestaurant);

module.exports = route;