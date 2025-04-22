const mongoose = require("mongoose");
const { type } = require("server/reply");


const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true
    },

    address: {
      type: Array,
    },

    phone: {
      type: String,
      required: true
    },

    usertype: {
      type: String,
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/imgres?q=user%20image&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20191120%2Foriginal%2Fpngtree-outline-user-icon-png-image_5045523.jpg&imgrefurl=https%3A%2F%2Fpngtree.com%2Fso%2Fuser&docid=Z8495iNCErdq3M&tbnid=A2OoDyktbwzsTM&vet=12ahUKEwiit7OV_biMAxWmxDgGHdaSMOAQM3oECCAQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwiit7OV_biMAxWmxDgGHdaSMOAQM3oECCAQAA",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel
