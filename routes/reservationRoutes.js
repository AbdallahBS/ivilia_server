// routes/reservations.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationsController'); // Adjust this path as necessary

// POST /api/reservations
router.post('/', reservationController.createReservation);

// GET /api/reservations
router.get('/', reservationController.getAllReservations);
router.get('/by-email', reservationController.getReservationsByEmail);


module.exports = router;
