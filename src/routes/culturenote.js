const express = require("express")
const route = express.Router()
const cultureNote = require("../controllers/CultureNote")

route.post("/", cultureNote.createCultureNote)
route.get("/", cultureNote.getCultureNote)
route.get("/:id", cultureNote.getCultureNoteById)
route.put("/:id", cultureNote.updateCultureNote)
route.delete("/:id", cultureNote.deleteCultureNote)

module.exports = route