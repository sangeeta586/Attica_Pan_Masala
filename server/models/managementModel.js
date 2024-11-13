const mongoose = require("mongoose");

const managementSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please add the confirm password"],
    },
    

  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Management", managementSchema);
