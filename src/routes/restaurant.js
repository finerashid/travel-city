const express = require('express');
const route = express.Router();
const {createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant}= require('../controllers/restaurant');

route.post('/', createRestaurant);
route.get('/', getRestaurants);
route.get('/:id', getRestaurantById);
route.put('/:id', updateRestaurant);
route.delete('/:id', deleteRestaurant);

module.exports = route;