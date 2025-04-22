const bookingModel = require('../models/bookingModel')
const bcrypt = require('bcrypt');


const createBookingController = async (req, resp) => {
    try {
        const bookings = await bookingModel.find({ restaurantId: req.restaurantId });

        resp.status(200).send({
            success: true,
            message: "successfully book",

        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'server error'
        })

    }
}


module.exports = { createBookingController }