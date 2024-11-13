const mongoose = require("mongoose");

const deliveryBoysDetailsSchema = mongoose.Schema(
  {
    username: {
      type: "String",
      required: true,
      errorMessage: "Please add the user name",
    },
    email: {
      type: "String",
      required: true,
      unique: true,
      errorMessage: "Please add the user email address",
    },
    password: {
      type: "String",
      required: true,
      errorMessage: "Please add the user password",
    },
    confirmPassword: {
      type: "String",
      required: true,
      errorMessage: "Please add the user confirm password",
    },
    phoneNo: {
      type: "Number",
      required: true,
      errorMessage: "Please add the user phone number",
    },
    address: {
      type: "String",
      required: true,
      errorMessage: "Please add the user address",
    },

    city: {
      type: "String",
      required: true,
      errorMessage: "Please add the user city",
    },
    pinCode: {
      type: "String",
      required: true,
      errorMessage: "Please add the user pinCode",
    },
    state: {
      type: "String",
      required: true,
      errorMessage: "Please add the user state",
    },

    stockistEmailId: {
      type: String,
      ref: "executives",
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("deliveryboysdetails", deliveryBoysDetailsSchema);
