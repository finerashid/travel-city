const express = require("express");
const router = express.Router();

const {signup, login, changePassword} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/signup", signup);   // to create a user

router.post("/login", login);    // to login the user

router.post("/change-password", protect, changePassword);  // to change the password and for that u will need to be login 

module.exports = router