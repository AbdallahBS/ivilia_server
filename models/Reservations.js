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
    status: {
        type: DataTypes.ENUM('en attend', 'accepter', 'refuser'),
        allowNull: false,
        defaultValue: 'en attend',
    },
}, {
    tableName: 'reservations',
    timestamps: true,
});

module.exports = Reservation;
