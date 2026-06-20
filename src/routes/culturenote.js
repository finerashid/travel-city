const express = require("express")
const route = express.Router()
const cultureNote = require("../controllers/CultureNote")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, cultureNote.createCultureNote)
route.get("/", authenticate, cultureNote.getCultureNote)
route.get("/:id", authenticate, cultureNote.getCultureNoteById)
route.put("/:id", authenticate, cultureNote.updateCultureNote)
route.delete("/:id", authenticate, cultureNote.deleteCultureNote)

module.exports = route