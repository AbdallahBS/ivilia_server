// controllers/reservationController.js
const Reservation = require('../models/Reservations'); // Adjust this path as necessary

// Function to create a reservation
exports.createReservation = async (req, res) => {
console.log("hehehe");
    const { phone_number, email, place_id } = req.body;

    if (!phone_number || !email || !place_id) {
        return res.status(400).json({ message: 'Phone number, email, and place ID are required.' });
    }

    try {
        const reservation = await Reservation.create({ phone_number, email, place_id });
        return res.status(201).json({ message: 'Reservation created successfully!', reservation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while creating the reservation.' });
    }
};

// Function to get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching reservations.' });
    }
};
