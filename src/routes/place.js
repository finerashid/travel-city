const express = require("express")
const route = express.Router()
const placeController = require("../controllers/Place")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, placeController.addPlace)
route.get("/", authenticate, placeController.getPlace)
route.get("/:id", authenticate, placeController.getPlaceById)
route.patch("/:id", authenticate, placeController.updatePlaceById)
route.delete("/:id", authenticate, placeController.deletePlaceById)

module.exports = route