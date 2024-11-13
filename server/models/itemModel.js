const mongoose = require('mongoose');

// Define the schema for your items
const itemSchema = new mongoose.Schema({
    
        user_id:{
         type: mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"User",
        },
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    units: String,

    price: {
        type: Number,
        required: true
    }
});

// Create a model from the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
