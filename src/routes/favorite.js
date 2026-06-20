const express = require("express")
const route = express.Router()
const favoriteController = require("../controllers/favorite")
const { authenticate } = require("../middlewares/authMiddleware");
const checkOwnership = require("../middlewares/checkOwnership");



route.post("/", authenticate, favoriteController.addFavorite)
route.get("/", authenticate, favoriteController.getFavorites);
route.get("/:id", authenticate, favoriteController.getFavoritesById);
route.patch("/:id", authenticate, checkOwnership, favoriteController.updateFavoritesById);
route.delete("/:id", authenticate, checkOwnership, favoriteController.deleteFavoriteById);
module.exports = route
