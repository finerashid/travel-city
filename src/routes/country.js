const express = require('express');
const router = express.Router();
const countryRoutes = require('../controllers/country');
const { authenticate } = require("../middlewares/authMiddleware");

// Route to create a new country
router.post('/', authenticate,  countryRoutes.createCountry);

// Route to get country details
router.get('/', authenticate,  countryRoutes.getCountry);
router.get('/:id', authenticate,  countryRoutes.getCountryById);
router.put('/:id', authenticate,  countryRoutes.updateCountry);
router.delete('/:id', authenticate,  countryRoutes.deleteCountry);

module.exports = router;