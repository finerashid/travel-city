const express = require("express")
const route = express.Router()
const favoriteController = require("../controller/favorite")

route.post("/", favoriteController.addFavorite)
route.get("/", favoriteController.getFavorites);
route.get("/:id", favoriteController.getFavoritesById);
route.patch("/:id", favoriteController.updateFavoritesById);
route.delete("/:id", favoriteController.deleteFavoriteById);
module.exports = route
