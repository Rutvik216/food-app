const bookingModel = require('../models/bookingModel')
const bcrypt = require('bcrypt');


const createBookingController = async (req, resp) => {
    try {
        const { customerName, bookingDate, tableNumber, restaurantId } = req.body;

        if (!customerName || !bookingDate || !tableNumber || !restaurantId) {
            return resp.status(400).send({
                success: false,
                message: "Please provide all required data",
            });
        }
        const existingBooking = await bookingModel.findOne({
            tableNumber,
            bookingDate,
            restaurantId,
        });

        if (existingBooking) {
            return resp.status(404).send({
                success: false,
                message: "This table is already booked for the selected time.",
            });
        }
        const newBooking = new bookingModel({
            customerName,
            bookingDate,
            tableNumber,
            restaurantId,
        });

        await newBooking.save(); // This is the missing link—the invocation of permanence.

        resp.status(201).send({
            success: true,
            message: "Booking successfully ",
            data: newBooking,
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        resp.status(500).send({
            success: false,
            message: 'Server error',
        });
    }
};



module.exports = { createBookingController }
