const express = require("express");
const router = express.Router();

const{ createTravelExpense, getTravelExpenses, getTravelExpenseById, updateTravelExpense} = require("../controllers/travelExpenseController");
const validateObjectId = require("../middlewares/validateObjectId");

router.post('/', createTravelExpense);   //. to create the travel expenses

router.get("/", getTravelExpenses);      // to get the expenses

router.get("/:id",validateObjectId, getTravelExpenseById);      // to get the specific expenses 

router.put("/:id", validateObjectId, updateTravelExpense)       // to update the specific travel expense

module.exports = router