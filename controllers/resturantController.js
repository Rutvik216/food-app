//create resturant

const resturantModel = require("../models/resturantModel");
const bcrypt = require('bcrypt');
//const Restaurant = require('../models/restaurantModel'); // name must match

const createResturantControlller = async (req, resp) => {
    try {
        const {
            email,
            password,
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        // validation
        if (!title || !coords) {
            return resp.status(500).send({
                success: false,
                message: "please provide title and address",
            });
        }
        const newResturant = new resturantModel({
            email,
            password,
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newResturant.save();

        resp.status(201).send({
            success: true,
            message: "New Resturant Created successfully",
        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'error in resturant api'
        })
    }

}

const getAllResturantController = async (req, resp) => {
    try {
        const resturants = await resturantModel.find({})
        if (!resturants) {
            return resp.status(404).send({
                success: 'false',
                message: 'no resturanr available'
            })
        }
        resp.status(200).send({
            success: 'true',
            totalCount: resturants.length,
            resturant: resturants
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            status: 'false',
            message: 'error in getall resturant api'
        })
    }
}

const getResturantByIdcontroller = async (req, resp) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            return resp.status(404).send({
                success: 'false',
                message: ' please provide resturant id'
            })
        }
        const resturant = await resturantModel.findById(resturantId)
        if (!resturant) {
            return resp.status(404).send({
                success: 'false',
                message: 'resturant not found'
            })
        }
        resp.status(200).send({
            success: 'true',
            resturant
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: 'false',
            message: 'error in get resturant id'
        })
    }
}

// delete id 
const deleteResturantController = async (req, resp) => {
    try {
        const resturantId = req.params.id
        if (!resturantId) {
            return resp.status(404).send({
                success: false,
                message: ' No resturant found or provide resturant id'
            })
        }
        await resturantModel.findByIdAndDelete(resturantId)
        resp.status(200).send({
            success: true,
            message: 'delete successfully'
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: 'error in delete resturant id'
        })
    }
}

const loginResturantController = async (req, resp) => {

    try {
        const { email, password } = req.body; // 

        // Now use `email`  safely
        const restaurant = await resturantModel.findOne({ email });
        if (!restaurant) {
            return resp.status(404).send({ message: 'Restaurant not found' });
        }


        resp.status(200).send({
            success: true,
            message: "successfully login",

        });
    }
    catch (error) {
        console.error('Login error:', error);
        resp.status(500).send({ message: 'Server error' });
    }
}


module.exports = {
    createResturantControlller,
    getAllResturantController,
    getResturantByIdcontroller,
    deleteResturantController,
    loginResturantController,
}