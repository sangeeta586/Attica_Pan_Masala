const mongoose = require('mongoose');

const suppliesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Assuming you have a User model
      },
    name: {
        type: String,
        required: true
    },
    products: [{
        type: String,
        required: true
    }],
    quantity: [{
        type: Number,
        required: true
    }],
    price: {
        type: Number,
        required: true
    }
});

const Supplies = mongoose.model('Supplies', suppliesSchema);

module.exports = Supplies;
