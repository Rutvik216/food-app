// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    tableNumber: {
        type: Number,
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'resturant',
    }
});
module.exports = mongoose.model('Booking', bookingSchema);
