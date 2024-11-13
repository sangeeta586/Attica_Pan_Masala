const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
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
    products: [
        {
            name: {
                type: String,
                required: true
            },
            description: String,
            price: {
                type: Number,
                required: true
            }
        }
    ]
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
