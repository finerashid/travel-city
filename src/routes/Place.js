const express = require("express")
const route = express.Router()
const placeController = require("../controllers/Place")

route.post("/add",placeController.addPlace)
route.get("/get",placeController.getPlace)
route.get("/get/:id",placeController.getPlaceById)
route.patch("/update/:id",placeController.updatePlaceById)
route.delete("/del/:id",placeController.deletePlaceById)

module.exports = route