const express = require("express")

const route = express.Router()

const localGuideController = require("../controllers/LocalGuide")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, localGuideController.addLocalGuide)

route.get("/", authenticate, localGuideController.getAllLocalGuides)
route.get("/:id", authenticate, localGuideController.getLocalGuideById)
route.put("/:id", authenticate, localGuideController.updateLocalGuide)
route.delete("/:id", authenticate, localGuideController.deleteLocalGuide)
module.exports = route