const mongoose = require('mongoose');

// Define the schema for productss
const productSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model
  },
  item_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  units: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  variants: [
    {
      name: String,
      description: String,
      units: String,
      price: Number,
      status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
      }
    }
  ]
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
