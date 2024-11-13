const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Assuming you have a User model
      },
    supplier: {
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
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered'],
        default: 'pending'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
