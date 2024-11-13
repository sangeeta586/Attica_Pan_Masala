const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Assuming you have a User model
      },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  products: {
    type:String,
    required:true
  }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
