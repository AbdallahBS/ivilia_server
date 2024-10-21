const express = require('express');
const router = express.Router();
const { getAllTravelDestinations, createTravelDestination } = require('../controllers/travelDestinationController'); // Ensure this path is correct

// POST route to create a new travel destination
router.post('/create',createTravelDestination);

// GET route to fetch all travel destinations
router.get('/', getAllTravelDestinations);

module.exports = router;
