const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");

const salesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User", // Assuming you have a User model
  },
  email_Id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  order_qty: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  price_per_unit: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
