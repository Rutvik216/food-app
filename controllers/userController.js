const userModel = require('../models/userModel');
const bcrypt = require("bcryptjs")
// Correct import
//get user info
const getUserControler = async (req, resp) => {

     try {
          //find user

          const user = await userModel.findById({ _id: req.userId })
          //validatio
          if (!user) {
               return resp.status(404).send({
                    success: false,
                    message: 'user not found'
               })
          }
          //user.password = undefined

          //resp

          resp.status(200).send({
               success: true,
               message: "user get succesfully",
               user,
          })
     }
     catch (error) {
          console.log(error)
          resp.status(500).send({
               success: false,
               message: 'error in get api',
               error
          })
     }
}

//update user
const updateUserControler = async (req, resp) => {
     try {
          const ID = req.userId
          const user = await userModel.findById({ _id: req.userId })
          //validation
          if (!user) {
               return resp.status(404).send({
                    success: false,
                    message: "user not found"
               })
          }

          // update
          const { userName } = req.body
          if (userName) user.userName = userName

          //   if (address) User.userName = address
          // if (phone) user.phone = phone

          // save user 
          const newUser = await userModel.findByIdAndUpdate(ID, { userName: userName })
          await newUser.save()
          resp.status(200).send({
               newUser,
               success: true,
               message: "user update successfully"
          })

     } catch (error) {
          console.log(error)
          resp.status(500).send(
               {
                    success: false,
                    message: 'error in updateuser api',
                    error
               })
     }
}

// updatePassword
const updatePasswordControler = async (req, resp) => {
     try {
          const ID = req.userId
          const user = await userModel.findById({ _id: req.userId })

          //validation
          if (!user) {
               return resp.status(404).send({
                    success: false,
                    message: "user not found"
               })
          }

          // update
          const { oldPassword, newPassword } = req.body
          if (!oldPassword || !newPassword) {

               return resp.status(500).send({
                    success: false,
                    message: 'please provide old or new password'
               })
          }

          //checck user password / compare password

          const isMatch = await bcrypt.compare(oldPassword, user.password)
          if (!isMatch) {
               return resp.status(500).send({
                    success: false,
                    message: "invalid old password"
               })
          }

          // hashing password
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hash(newPassword, salt)
          user.password = hashedPassword

          await user.save()
          resp.status(200).send({
               success: true,
               message: "password updated!"
          })

     } catch (error) {
          console.log(error)
          resp.status(500).send({
               success: false,
               message: 'error in update password',
               error
          })
     }
}

//delete profile account

const deleteProfileController = async (req, resp) => {

     try {
          await userModel.findByIdAndDelete(req.params.id)
          return resp.status(200).send({
               success: true,
               message: 'profile deleted successfully'
          })
     } catch (error) {
          console.log(error)
          resp.status(500).send({
               success: false,
               message: 'error in delete profile'
          })
     }

}

module.exports = { getUserControler, updateUserControler, updatePasswordControler, deleteProfileController }