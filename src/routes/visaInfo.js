const express = require("express")
const route = express.Router()

const visaInfoController = require("../controllers/VisaInfo")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, visaInfoController.addVisaInfo)
route.get("/read", authenticate, visaInfoController.getVisaInfo)
route.get("/read/:id", authenticate, visaInfoController.getVisaInfoById)
route.put("/", authenticate, visaInfoController.updateVisaInfo)
module.exports = route