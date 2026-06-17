const express = require("express");
const router = express.Router();

const{ createTravelExpense, getTravelExpenses} = require("../controllers/travelExpenseController");

router.post('/', createTravelExpense);   //. to create the travel expenses

router.get("/", getTravelExpenses);      // to get the expenses

module.exports = router