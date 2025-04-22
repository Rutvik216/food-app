const express = require("express");

const authMiddlware = require("../middlewares/authMiddleware");
const { createResturantControlller, getAllResturantController, getResturantId, getResturantByIdcontroller, resturantId, deleteResturantController, getRestaurantTimings, loginResturantController } = require("../controllers/resturantController");

const router = express.Router();

//routes
//create resturant || post
router.post('/create', authMiddlware, createResturantControlller)

// get all resturant 
router.get('/getall', getAllResturantController)

//  get resturant by id 
router.get('/get/:id', getResturantByIdcontroller)

// delete resturant by id
router.delete('/delete/:id', authMiddlware, deleteResturantController)

// login resturant by id
router.post('/loginresturant', authMiddlware, loginResturantController)

module.exports = router;