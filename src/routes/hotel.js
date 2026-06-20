const express = require("express")
const route = express.Router()
const hotelControllers = require("../controllers/hotel")

route.post("/add", hotelControllers.addHotel)
route.get("/list", hotelControllers.getHotels)
route.get("/list/:id", hotelControllers.getHotelsById)
route.put("/update/:id", hotelControllers.updateHotel)
route.delete("/delete/:id", hotelControllers.deleteHotel)



module.exports = route