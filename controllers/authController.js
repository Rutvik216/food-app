// Import your user model
const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs")
const JWT = require('jsonwebtoken')
//registration

const registerController = async (req, resp) => {
  try {
    const { userName, Email, password, phone } = req.body;
    //filled data
    if (!userName || !Email || !phone || !password) {
      return resp.status(500).send({
        success: false,
        message: "please fill the data ",
      });
    }

    //check user

    const exisiting = await userModel.findOne({ Email });

    if (exisiting) {
      return resp.status(500).send({
        success: false,
        message: " E-mail already registerd please login",
      });
    }
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user

    const user = await userModel.create({
      userName,
      Email,
      password: hashedPassword,
      phone,
    });
    resp.status(201).send({
      success: true,
      message: "successfuly registered",
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "error in registration api",
      error,
    });
  }
};

//login

const loginController = async (req, resp) => {
  try {
    const { Email, password } = req.body;
    console.log("Body", req.body)
    // validfatuion
    if (!Email || !password) {
      return resp.status(500).send({
        success: false,
        message: "please provide Email or password",
      });
    }

    // check user
    const user = await userModel.findOne({ Email: Email });
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "i think you fill wrong id or password",
      });
    }

    //checck user password / compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return resp.status(500).send({
        success: false,
        message: "invalid credentials"
      })
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24hours',
    })
    user.password = undefined
    resp.status(200).send({
      success: true,
      message: "successfully login",
      token,
      user,

    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
