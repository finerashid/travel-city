const express = require("express");
const router = express.Router();

const {
  createTravelExpense,
  getTravelExpenses,
  getTravelExpenseById,
  updateTravelExpense,
  deleteTravelExpenses,
} = require("../controllers/travelExpenseController");
const { authenticate } = require("../middlewares/authMiddleware");
const checkOwnership = require("../middlewares/checkOwnership");
const validateObjectId = require("../middlewares/validateObjectId");
const TravelExpense = require("../models/TravelExpense");

router.post("/", authenticate, createTravelExpense); //. to create the travel expenses

router.get("/", authenticate, getTravelExpenses); // to get the expenses

router.get(
  "/:id",
  authenticate,
  checkOwnership(TravelExpense),
  validateObjectId,
  getTravelExpenseById,
); // to get the specific expenses

router.put(
  "/:id",
  authenticate,
   checkOwnership(TravelExpense),
  validateObjectId,
  updateTravelExpense,
); // to update the specific travel expense

router.delete(
  "/:id",
  authenticate,
  checkOwnership(TravelExpense),
  validateObjectId,
  deleteTravelExpenses,
); // to delete the specific travel expense

module.exports = router;
