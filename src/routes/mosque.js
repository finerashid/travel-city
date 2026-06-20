const express = require("express")
const route = express.Router()
const mosqueController = require("../controller/mosque")

route.post("/", mosqueController.addMosque)
route.get("/", mosqueController.getMosques);
route.get("/:id", mosqueController.getMosqueById);
route.patch("/:id", mosqueController.updateMosque);
route.delete("/:id", mosqueController.deleteMosque);
module.exports = route