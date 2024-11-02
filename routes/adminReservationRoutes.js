const express = require('express');
const router = express.Router();
const adminReservationController = require('../controllers/adminReservationController');

// Route to get all reservations
router.get('/all', adminReservationController.getAllReservations);

// Route to accept a reservation
router.patch('/:id/accept', adminReservationController.acceptReservation);

// Route to refuse a reservation
router.patch('/:id/refuse', adminReservationController.refuseReservation);

module.exports = router;
