const express = require("express");
const router = express.Router();

const {signup, login,} = require("../controllers/authController");

router.post("/signup", signup);   // to create a user

router.post("/login", login);    // to login the user

module.exports = router