const express = require("express");
const route = express.Router();
const { createCity, getCities, getCityById, updateCity, deleteCity } = require("../controllers/city");

route.post("/", createCity);
route.get("/", getCities);
route.get("/:id", getCityById);
route.put("/:id", updateCity);
route.delete("/:id", deleteCity);

module.exports = route;

