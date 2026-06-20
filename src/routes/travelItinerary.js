const express = require("express")
const route = express.Router()
const itineraryController = require("../controllers/TravelItinerary")
const { authenticate } = require("../middlewares/authMiddleware");
const checkOwnership = require("../middlewares/checkOwnership");


route.post("/", authenticate, itineraryController.addItinerary)
route.get("/", authenticate, itineraryController.getItinerary)
route.get("/:id", authenticate, itineraryController.getItineraryById)
route.patch("/:id", authenticate, checkOwnership, itineraryController.updateItineraryById)
route.delete("/:id", authenticate, checkOwnership, itineraryController.deleteItineraryById)
module.exports = route