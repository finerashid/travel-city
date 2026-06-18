const express = require("express")
const route = express.Router()
const placeController = require("../controllers/Place")

route.post("/add",placeController.addPlace)
route.get("/get",placeController.getPlace)


module.exports = route