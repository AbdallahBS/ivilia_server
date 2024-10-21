// Import the express module
const express = require('express');
const app = express();
const sequelize = require('./db/database')  // Import the database connection pool
const travelDestinationRoutes = require('./routes/travelDestinationRoutes');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes'); // Adjust the path as necessary

// Define the port to run the server on

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());
// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to my Node.js server.');
});
app.use('/api/travel-destination', travelDestinationRoutes);

app.use('/api/reservations', reservationRoutes);

const startServer = async () => {
    try {
      await sequelize.authenticate(); // Test database connection
      console.log('Database connected successfully.');
  
  
  
      // Sync all models
      await sequelize.sync(); // Creates the tables if they do not exist (and does not remove existing ones)
      console.log('All models were synchronized successfully.');
  
      app.listen(3000, () => {
        console.log(`Server running on http://localhost:${3000}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  // Start the server
  startServer();