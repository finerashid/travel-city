const express = require('express');
const route = express.Router();
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require('../controllers/restaurant');
const { authenticate } = require("../middlewares/authMiddleware");

route.post('/', authenticate,  createRestaurant);
route.get('/', authenticate,  getRestaurants);
route.get('/:id', authenticate,  getRestaurantById);
route.put('/:id', authenticate,  updateRestaurant);
route.delete('/:id', authenticate,  deleteRestaurant);

module.exports = route;