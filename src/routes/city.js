const express = require("express");
const route = express.Router();
const { createCity, getCities, getCityById, updateCity, deleteCity } = require("../controllers/city");
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, createCity);
route.get("/", authenticate, getCities);
route.get("/:id", authenticate, getCityById);
route.put("/:id", authenticate, updateCity);
route.delete("/:id", authenticate, deleteCity);

module.exports = route;

