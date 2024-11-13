const mongoose = require('mongoose');

const sosAlertSchema = new mongoose.Schema({
    emailId: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    uniqueCode: {
        type: Number, // Assuming uniqueCode is a numerical value
        default: null // Setting default as null if it's optional
    },
    alert: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const SosAlert = mongoose.model("SosAlert", sosAlertSchema);

module.exports = SosAlert;
