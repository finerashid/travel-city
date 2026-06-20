const express = require("express")
const route = express.Router()
const favoriteController = require("../controllers/favorite")
const { authenticate } = require("../middlewares/authMiddleware");

route.post("/", authenticate, favoriteController.addFavorite)
route.get("/", authenticate, favoriteController.getFavorites);
route.get("/:id", authenticate, favoriteController.getFavoritesById);
route.patch("/:id", authenticate, favoriteController.updateFavoritesById);
route.delete("/:id", authenticate, favoriteController.deleteFavoriteById);
module.exports = route
