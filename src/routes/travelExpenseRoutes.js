const express = require("express");
const router = express.Router();

const{ createTravelExpense, getTravelExpenses, getTravelExpenseById, updateTravelExpense, deleteTravelExpenses} = require("../controllers/travelExpenseController");
const {protect} = require("../middlewares/authMiddleware")
const validateObjectId = require("../middlewares/validateObjectId");

router.post('/', protect, createTravelExpense);   //. to create the travel expenses

router.get("/", protect, getTravelExpenses);      // to get the expenses

router.get("/:id", protect, validateObjectId, getTravelExpenseById);      // to get the specific expenses 

router.put("/:id", protect, validateObjectId, updateTravelExpense);       // to update the specific travel expense

router.delete("/:id", protect, validateObjectId, deleteTravelExpenses);   // to delete the specific travel expense

module.exports = router