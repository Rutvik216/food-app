// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: String,
    bookingDate: Date,
    tableNumber: Number,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resturantModel',
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
