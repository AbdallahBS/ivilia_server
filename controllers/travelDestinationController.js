const TravelDestination = require('../models/TravelDestinations');

// Controller function to create a new travel destination
const createTravelDestination = async (req, res) => {
  try {
    const { name, category, image, location, review, price, description, rate } = req.body;

    // Create a new TravelDestination in the database
    const newDestination = await TravelDestination.create({
      name,
      category,
      image,
      location,
      review,
      price,
      description,
      rate
    });

    res.status(201).json({
      message: 'Travel destination created successfully',
      data: newDestination
    });
  } catch (error) {
    console.error('Error creating travel destination:', error);
    res.status(500).json({
      message: 'Failed to create travel destination',
      error: error.message
    });
  }
};

// You can add more functions here for fetching, updating, and deleting destinations
// For example, a function to get all travel destinations
const getAllTravelDestinations = async (req, res) => {
  try {
    const destinations = await TravelDestination.findAll();
    res.status(200).json(destinations);
  } catch (error) {
    console.error('Error fetching travel destinations:', error);
    res.status(500).json({
      message: 'Failed to fetch travel destinations',
      error: error.message
    });
  }
};

module.exports = {
  createTravelDestination,
  getAllTravelDestinations
};
