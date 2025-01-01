const mongoose = require("mongoose");

const inspectionShopDetailsSchema = mongoose.Schema(
  {
    fieldManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FieldManagerLogin", // Name of the FieldManager model
      required: false, // Optional field
      default: null,
    },
    PanShopOwner: {
      type: String,
    },
    shop_name: {
      type: String,
      required: true,
    },
    shop_address: {
      type: String,
      required: true,
    },
    shop_contact_number: {
      type: String,
      required: true,
    },
    shop_owner_name: {
      type: String,
    },
    Issues_Reported: {
      type: String,
    },
    Feedback_Provided: {
      type: String,
    },
    Photos_Uploaded: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    remarks: {
      type: String,
      default: "",
    },
    shop_Location: [
      {
        longitude: { type: Number },
        latitude: { type: Number },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    reviewsDetails: [
      {
        title: {
          type: String,
          required: true,
          default: "Inspection Report",
        },
        fragrance: {
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
          },
        },
        tasteAndFlavor: {
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
          },
        },
        productSimilarity: {
          type: String,
          required: true,
          trim: true,
        },
        reviews: {
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

const InspectionShop = mongoose.model(
  "vendorRegisterShop",
  inspectionShopDetailsSchema
);

module.exports = InspectionShop;
