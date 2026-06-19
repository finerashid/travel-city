const express = require("express")
const route = express.Router()

const visaInfoController = require("../controller/VisaInfo")

route.post("/add",visaInfoController.addVisaInfo)
route.get("/read",visaInfoController.getVisaInfo)
route.get("/read/:id", visaInfoController.getVisaInfoById)
route.put("/update", visaInfoController.updateVisaInfo)
module.exports = route