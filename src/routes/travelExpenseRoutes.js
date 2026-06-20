const express = require("express");
const router = express.Router();

const { createTravelExpense, getTravelExpenses, getTravelExpenseById, updateTravelExpense, deleteTravelExpenses } = require("../controllers/travelExpenseController");
const { authenticate } = require("../middlewares/authMiddleware")
const validateObjectId = require("../middlewares/validateObjectId");

router.post('/', authenticate,  authenticate, createTravelExpense);   //. to create the travel expenses

router.get("/", authenticate, authenticate, getTravelExpenses);      // to get the expenses

router.get("/:id", authenticate, authenticate, validateObjectId, getTravelExpenseById);      // to get the specific expenses 

router.put("/:id", authenticate, authenticate, validateObjectId, updateTravelExpense);       // to update the specific travel expense

router.delete("/:id", authenticate, authenticate, validateObjectId, deleteTravelExpenses);   // to delete the specific travel expense

module.exports = router