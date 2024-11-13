const mongoose = require('mongoose');

const itemStocksSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", 
      },
      
    category: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    stockCount: {
        type: Number,
        required: true
    },
    lastStock: {
        type: Number,
        default: 0
    },
    quality: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    }
});

const ItemStocks = mongoose.model('ItemStocks', itemStocksSchema);

module.exports = ItemStocks;












                                                       



































































