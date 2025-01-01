const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  AreaSealMangerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "AreaSealMangerSchema",
  },
  locations: [
    {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Location = mongoose.model("AreaSellManagerLocation", locationSchema);

module.exports = Location;
