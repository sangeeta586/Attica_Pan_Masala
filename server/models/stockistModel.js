const mongoose = require("mongoose");

const stockistSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },

    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please add the user confirm password"],
    },
    country: {
      type: String,
      required: true,
      enum: ["India"],
      default: "India",
    },
    state: {
      type: String,
      required: true,
     
    },
    city: {
      type: String,
      required: [true, "please add the city "],
    },
    address: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stockist&admin", stockistSchema);