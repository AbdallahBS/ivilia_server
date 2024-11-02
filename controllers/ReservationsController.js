// controllers/reservationController.js
const Reservation = require('../models/Reservations'); // Adjust this path as necessary
const TravelDestination = require('../models/TravelDestinations'); // Adjust this path as necessary

const User = require('../models/User'); // Assuming you have a User model

// Function to create a reservation
exports.createReservation = async (req, res) => {
    const { username, password, place_id } = req.body;
  console.log(username,password ,place_id);
  
    // Validate required fields
    if (!username || !password || !place_id) {
        return res.status(400).json({ message: 'username, password, and place ID are required.' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({
            where: {
                username: username,
                password: password,
            },
            attributes: ['phone_number', 'email'],

        });

        // If user not found, return an error
        if (!user) {
            return res.status(404).json({ message: 'Account not found. Please check your name and password.' });
        }

        // If user exists, create the reservation
        const reservation = await Reservation.create({           
            phone_number: user.phone_number, // Get phone number from user
            email: user.email, // Get email from user
            place_id: place_id,
             place_id });
             console.log("done");
             
        return res.status(201).json({ message: 'Reservation created successfully!', reservation  ,user: { phone_number: user.phone_number, email: user.email }, });

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

exports.getReservationsByEmail = async (req, res) => {
    console.log('get reservation by email ');
    
    const { email } = req.query;
    console.log(req.query);
    
  console.log(email);
  
    try {
        const reservations = await Reservation.findAll({
            where: { email },
            include: [{
                model: TravelDestination,
                as: 'destination',
                attributes: ['name', 'location', 'category', 'image', 'price', 'rate', 'description'],
            }],
        });

        if (reservations.length === 0) {
            return res.status(404).json({ message: 'No reservations found for this email.' });
        }

        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching reservations.' });
    }
};