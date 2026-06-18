const express = require("express")
const route = express.Router()
const favoriteController = require("../controller/favorite")

route.post("/", favoriteController.addFavorite)

module.exports = route
