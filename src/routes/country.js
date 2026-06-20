const express = require('express');
const router = express.Router();
const countryRoutes  = require('../controllers/country');

// Route to create a new country
router.post('/add', countryRoutes.createCountry);

// Route to get country details
router.get('/list', countryRoutes.getCountry);
router.get('/list/:id', countryRoutes.getCountryById);
router.put('/update/:id', countryRoutes.updateCountry);
router.delete('/delete/:id', countryRoutes.deleteCountry);

module.exports = router;