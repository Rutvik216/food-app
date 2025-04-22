const express = require("express");
const { getUserControler, updateUserControler, updatePasswordControler, deleteProfileController } = require("../controllers/userController");
const authMiddlware = require("../middlewares/authMiddleware")

const router = express.Router();

//routes
// login || get
router.get("/getUser", authMiddlware, getUserControler)

//update profile
router.put('/updateUser', authMiddlware, updateUserControler)

//update password
router.post('/updatePassword', authMiddlware, updatePasswordControler)

// delete user 
router.delete("/deleteUser/:id", authMiddlware, deleteProfileController)


module.exports = router; 