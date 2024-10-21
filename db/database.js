const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ivilia', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres', // Specify your database dialect
  logging: false, // Log SQL queries for debugging

  port: 5432, // Set to true if you want to see SQL queries
});

module.exports = sequelize;