const asyncHandler = require("express-async-handler");
const SuperStockistRegistered = require("../models/superStockistModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

function validatePassword(password) {
  const minLength = 8; // Minimum length for the password
  const maxLength = 20; // Maximum length for the password
  return password.length >= minLength && password.length <= maxLength;
}

// @desc Register a admin
//@route POST/api/users/register
//@access public

const registerUser = asyncHandler(async (req, resp) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    country,
    state,
    city,
    address,
    pinCode,
    wareHouseName,
    phoneNo,
  } = req.body;
  if (password !== confirmPassword) {
    resp.status(400);
    throw new Error("password and confirmPassword are not matched !");
  }
  if (!validatePassword(password)) {
    resp.status(400);
    throw new Error("Password must be between 8 and 20 characters long.");
  }
  if (
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !country ||
    !state ||
    !city ||
    !address ||
    !pinCode ||
    !wareHouseName
  ) {
    resp.status(400);
    throw new Error("All fields are mandatory !");
  }

  const superStockistSignupAvailable = await SuperStockistRegistered.findOne({
    email,
  });

  if (superStockistSignupAvailable) {
    resp.status(400);
    throw new Error("User already registered !");
  }
  //Hash password;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);

  //Hash confirmPassword;

  const hashedCpassword = await bcrypt.hash(confirmPassword, 10);
  console.log("Hashed CPassword", hashedCpassword);

  const superStockistRegistered = await SuperStockistRegistered.create({
    username,
    email,
    password: hashedPassword,
    confirmPassword: hashedCpassword,
    country,
    state,
    city,
    address,
    pinCode,
    wareHouseName,
    phoneNo,
  });
  console.log(`Executive User created ${superStockistRegistered}`);
  if (superStockistRegistered) {
    resp.status(201).json({
      _id: superStockistRegistered.id,
      email: superStockistRegistered.email,
    });
  } else {
    resp.status(400);
    throw new Error("superStockistRegistered data us not valid");
  }

  resp.status(200).json({ message: " Register the superStockistRegistered" });
});

// @desc Login a user
//@route POST/api/users/login
//@access public

const loginUser = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(400);
    throw new Error("All fields are mandatory !");
  }

  const normalizedEmail = email.toLowerCase(); // Convert email to lowercase

  const superStockistRegistered = await SuperStockistRegistered.findOne({
    email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
  });

  //compare password with hashedpassword
  if (
    superStockistRegistered &&
    (await bcrypt.compare(password, superStockistRegistered.password))
  ) {
    const accessToken = jwt.sign(
      {
        userExecutive: {
          username: superStockistRegistered.username,
          email: superStockistRegistered.email,
          id: superStockistRegistered.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1500m",
      }
    );
    resp.status(200).json({ accessToken });
  } else {
    resp.status(401);
    throw new Error("Email or password is not valid");
  }

  resp.json({ message: "Login the superStockistRegistered" });
});

const updatePassword = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  console.log(`Received ID: ${id}`);

  // Ensure all required fields are provided
  if (!newPassword || !confirmNewPassword) {
    res.status(400).json({ message: "All fields are mandatory!" });
    return;
  }

  // Check if newPassword and confirmNewPassword match
  if (newPassword !== confirmNewPassword) {
    res
      .status(400)
      .json({ message: "New password and confirmation do not match!" });
    return;
  }

  try {
    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid user ID!" });
      return;
    }

    // Find the user by ID
    const superStockistRegistered = await SuperStockistRegistered.findById(id);
    console.log(superStockistRegistered);
    if (!superStockistRegistered) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Use updateOne to update only the password field
    await SuperStockistRegistered.updateOne(
      { _id: id },
      { $set: { password: hashedNewPassword } }
    );

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(`Error updating password: ${error.message}`);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// @desc current  userinfo
//@route POST/api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  // Check if userExecutive exists on the request object
  if (req.userExecutive) {
    res.json({
      message: "superStockistRegistered current user information",
      user: req.userExecutive, // Send the userExecutive data
    });
  } else {
    res.status(400);
    throw new Error("User information not found");
  }
});

const GetAllUser = asyncHandler(async (req, resp) => {
  const getAllUser = await SuperStockistRegistered.find();
  resp.status(200).json(getAllUser);
});

// @desc Delete a user
//@route DELETE /api/users/:id
//@access private (can be modified based on your access control)

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the user ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid user ID!" });
    return;
  }

  // Find the user by ID
  const superStockistRegistered = await SuperStockistRegistered.findById(id);

  if (!superStockistRegistered) {
    res.status(404).json({ message: "User not found!" });
    return;
  }

  // Delete the user from the database
  await superStockistRegistered.remove();

  res.status(200).json({ message: "User deleted successfully!" });
});

// @desc Update a user's information
//@route PUT /api/users/:id
//@access private

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    country,
    state,
    city,
    address,
    pinCode,
    wareHouseName,
    phoneNo,
  } = req.body;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID!" });
  }

  // Find the user by ID
  const superStockistRegistered = await SuperStockistRegistered.findById(id);

  if (!superStockistRegistered) {
    return res.status(404).json({ message: "User not found!" });
  }

  // Update the user fields
  superStockistRegistered.username =
    username || superStockistRegistered.username;
  superStockistRegistered.email = email || superStockistRegistered.email;
  superStockistRegistered.country = country || superStockistRegistered.country;
  superStockistRegistered.state = state || superStockistRegistered.state;
  superStockistRegistered.city = city || superStockistRegistered.city;
  superStockistRegistered.address = address || superStockistRegistered.address;
  superStockistRegistered.pinCode = pinCode || superStockistRegistered.pinCode;
  superStockistRegistered.wareHouseName =
    wareHouseName || superStockistRegistered.wareHouseName;
  superStockistRegistered.phoneNo = phoneNo || superStockistRegistered.phoneNo;

  try {
    // Save the updated user details, wait for it to complete
    const updatedUser = await superStockistRegistered.save();

    // Only respond once the operation completes successfully
    return res
      .status(200)
      .json({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    // Handle any potential errors that arise during save
    console.error("Error saving user:", error);
    return res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
});

const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Normalize email (optional, for case insensitivity)
  const normalizedEmail = email.toLowerCase();

  const user = await SuperStockistRegistered.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    return;
  }

  res.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  GetAllUser,
  updatePassword,
  deleteUser,
  updateUser,
  getUserByEmail,
};
