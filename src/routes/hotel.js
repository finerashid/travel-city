const express = require("express")
const route = express.Router()
const hotelControllers = require("../controllers/hotel")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, hotelControllers.addHotel)
route.get("/", authenticate, hotelControllers.getHotels)
route.get("/:id", authenticate, hotelControllers.getHotelsById)
route.put("/:id", authenticate, hotelControllers.updateHotel)
route.delete("/:id", authenticate, hotelControllers.deleteHotel)



module.exports = route