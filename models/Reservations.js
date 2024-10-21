// models/Reservation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database'); // Adjust this path as necessary

const Reservation = sequelize.define('Reservation', {
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'reservations',
    timestamps: true,
});

module.exports = Reservation;
