const express = require("express")

const route = express.Router()

const localGuideController = require("../controller/LocalGuide")

route.post("/add", localGuideController.addLocalGuide)

route.get("/get",localGuideController.getAllLocalGuides)
route.get("/get/:id",localGuideController.getLocalGuideById)
route.put("/update/:id",localGuideController.updateLocalGuide)
route.delete("/delete/:id",localGuideController.deleteLocalGuide)
module.exports = route