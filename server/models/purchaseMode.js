const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler'); // Assuming you're using express-async-handler middleware

// Define the schema for your purchases
const purchaseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model
  },
  vendor: String,
  category:String,
  products: [
    {
      name: String,
      units: Number,
      purchase_price: Number
    }
  ]
});

// Create a model from the schema
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;