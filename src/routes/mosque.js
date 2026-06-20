const express = require("express")
const route = express.Router()
const mosqueController = require("../controllers/mosque")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, mosqueController.addMosque)
route.get("/", authenticate, mosqueController.getMosques);
route.get("/:id", authenticate, mosqueController.getMosqueById);
route.patch("/:id", authenticate, mosqueController.updateMosque);
route.delete("/:id", authenticate, mosqueController.deleteMosque);
module.exports = route