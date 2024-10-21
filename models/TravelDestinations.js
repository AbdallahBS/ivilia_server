const { DataTypes } = require('sequelize');
const sequelize = require('../db/database'); // Adjust based on your setup

const TravelDestination = sequelize.define('TravelDestination', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING), // To store an array of image URLs
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  review: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = TravelDestination;
