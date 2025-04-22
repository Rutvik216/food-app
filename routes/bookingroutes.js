const express = require("express")
const authMiddleware = require('../middlewares/authMiddleware')
const { createBookingController } = require("../controllers/bookingController")

const router = express.Router();

//Routes
router.post('/table', authMiddleware, createBookingController)

module.exports = router