const express = require("express")
const route = express.Router()
const itineraryController = require("../controllers/TravelItinerary")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, itineraryController.addItinerary)
route.get("/", authenticate, itineraryController.getItinerary)
route.get("/:id", authenticate, itineraryController.getItineraryById)
route.patch("/:id", authenticate, itineraryController.updateItineraryById)
route.delete("/:id", authenticate, itineraryController.deleteItineraryById)
module.exports = route