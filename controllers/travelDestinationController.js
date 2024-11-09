const TravelDestination = require('../models/TravelDestinations');
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");


const TOKEN = "b905c868d49b7c13f29f4ec9aa50b107";
const transporter = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

// Controller function to create a new travel destination
const createTravelDestination = async (req, res) => {
  try {
    const { name, category, image, location, review, price, description, rate } = req.body;
    const imageArray = image.split(','); // This will create an array from the comma-separated string

    // Create a new TravelDestination in the database
    const newDestination = await TravelDestination.create({
      name,
      category,
      image: imageArray, // Use the array here
      location,
      review,
      price,
      description,
      rate
    });


        // Fetch all users to send the notification
   //     const users = await User.findAll({ attributes: ['email', 'username'] });
       // const userEmails = users.map(user => user.email);
    
        // Email content
        const subject = "New Travel Destination Available!";
        const text = `Hello! We're excited to introduce a new travel destination: ${name} in ${location}. Check out the details and start planning your journey!`;
        const html = `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #4CAF50; text-align: center;">New Travel Destination: ${name}</h2>
            <p style="font-size: 16px; line-height: 1.5; text-align: center;">
              We're excited to announce a new travel destination: <strong>${name}</strong> located in <strong>${location}</strong>.
            </p>
            
            <!-- Image -->
            <div style="text-align: center; margin: 20px 0;">
              <img src="${image}" alt="${name}" style="max-width: 100%; border-radius: 8px;" />
            </div>
    
            <!-- Details -->
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              <strong>Category:</strong> ${category} <br/>
              <strong>Price:</strong> $${price} <br/>
              <strong>Rating:</strong> ${rate}/5 <br/>
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">${description}</p>
    
            <!-- Button -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://yourwebsite.com/destinations/${newDestination.id}" style="text-decoration: none; color: white; background-color: #4CAF50; padding: 10px 20px; border-radius: 5px; display: inline-block;">
                View Destination On the App
              </a>
            </div>
    
            <!-- Footer -->
            <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
              &copy; ${new Date().getFullYear()} Ivialia. All rights reserved.
            </p>
          </div>
        `;
    
        // Send email to each user
    
          const mailOptions = {
            from: '"Ivialia" <hello@demomailtrap.com>',
            to: 'abenssalem32@gmail.com',
            subject,
            text,
            html
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email to:', user.email, error);
            } else {
              console.log('Email sent to:', user.email, info.response);
            }
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
// Controller function to get a travel destination by ID
const getTravelDestinationById = async (req, res) => {
  const { id } = req.params; // Extract ID from the request parameters
  try {
    const destination = await TravelDestination.findByPk(id); // Fetch the destination by primary key (ID)
    
    if (!destination) {
      return res.status(404).json({ message: 'Travel destination not found' });
    }
    
    res.status(200).json(destination);
  } catch (error) {
    console.error('Error fetching travel destination by ID:', error);
    res.status(500).json({
      message: 'Failed to fetch travel destination',
      error: error.message
    });
  }
};


module.exports = {
  createTravelDestination,
  getAllTravelDestinations,
  getTravelDestinationById
};
