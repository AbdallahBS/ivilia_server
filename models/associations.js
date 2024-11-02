const Reservation = require('./Reservations');
const TravelDestination = require('./TravelDestinations');

// Define associations
TravelDestination.hasMany(Reservation, { foreignKey: 'place_id' });
Reservation.belongsTo(TravelDestination, { foreignKey: 'place_id', as: 'destination' });
