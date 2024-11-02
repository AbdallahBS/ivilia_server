// controllers/adminReservationController.js

const Reservation = require('../models/Reservations')

// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

// Accept a reservation
exports.acceptReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        } 
        reservation.status = 'accepter';
        await reservation.save();
        res.status(200).json({ message: 'Reservation accepted', reservation });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting reservation', error });
    }
};

// Refuse a reservation
exports.refuseReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        reservation.status = 'refuser';
        await reservation.save();
        res.status(200).json({ message: 'Reservation refused', reservation });
    } catch (error) {
        res.status(500).json({ message: 'Error refusing reservation', error });
    }
};
