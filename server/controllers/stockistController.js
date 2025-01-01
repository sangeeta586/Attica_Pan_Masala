const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Executives = require("../models/stockistModel");

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
    selectedSuperStockist,
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
    !city
  ) {
    resp.status(400);
    throw new Error("All fields are mandatory !");
  }

  const executiveUserAvailable = await Executives.findOne({ email });
  if (executiveUserAvailable) {
    resp.status(400);
    throw new Error("User already registered !");
  }

  //Hash password;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashedPassword);

  //Hash confirmPassword;

  const hashedCpassword = await bcrypt.hash(confirmPassword, 10);
  console.log("Hashed CPassword", hashedCpassword);

  const executive = await Executives.create({
    username,
    email,
    password: hashedPassword,
    confirmPassword: hashedCpassword,
    country,
    state,
    city,
    address,
    pinCode,
    superstockist: selectedSuperStockist,
  });
  console.log(`Executive User created ${executive}`);
  if (executive) {
    resp.status(201).json({ _id: executive.id, email: executive.email });
  } else {
    resp.status(400);
    throw new Error("Executive data us not valid");
  }

  resp.status(200).json({ message: " Register the executive" });
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

  const executive = await Executives.findOne({
    email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
  });

  //compare password with hashedpassword
  if (executive && (await bcrypt.compare(password, executive.password))) {
    const accessToken = jwt.sign(
      {
        userExecutive: {
          username: executive.username,
          email: executive.email,
          id: executive.id,
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

  resp.json({ message: "Login the executive" });
});

// @desc current  userinfo
//@route POST/api/users/current
//@access private

const currentUser = asyncHandler(async (req, resp) => {
  resp.json({ message: "Executive current user information" });
});

const getStateCity = asyncHandler(async (req, resp) => {
  const executive = await Executives.findOne({ email: req.params.email });
  if (!executive) {
    resp.status(404);
    throw new Error("Executive not found");
  }
  resp.status(200).json({ state: executive.state, city: executive.city });
});

const getUserDetailsByEmail = async (req, res) => {
  const { email } = req.body; // Get the email from the request params

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Query the database for the user by email and populate the necessary fields
    const user = await Executives.findOne({ email }).populate("superstockist"); // Make sure 'superstockist' is the correct field to populate

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user details as a response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const GetAllUser = asyncHandler(async (req, resp) => {
  const getAllUser = await Executives.find();
  resp.status(200).json(getAllUser);
});

const getStockistBySuperByID = asyncHandler(async (req, res) => {
  try {
    const superStockistId = req.params.id;

    // Convert superStockistId to ObjectId if it's not already an ObjectId
    const ObjectId = require("mongoose").Types.ObjectId;
    if (!ObjectId.isValid(superStockistId)) {
      return res.status(400).json({ message: "Invalid superStockistId" });
    }

    // Fetch stockists based on superStockistId
    const stockists = await Executives.find({
      superStockistId: new ObjectId(superStockistId),
    });

    // Check if stockists exist for the given ID
    if (!stockists || stockists.length === 0) {
      return res
        .status(404)
        .json({ message: "No stockists found for the given superStockistId." });
    }

    // Send the found stockists as a response
    res.status(200).json(stockists);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching stockists", error: error.message });
  }
});

// @desc Update an executive's details
// @route PUT /api/users/update/:id
// @access private

const updateUser = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    country,
    state,
    city,
    address,
    pinCode,
    selectedSuperStockist,
  } = req.body;

  // Validate password if provided
  if (password && !validatePassword(password)) {
    resp.status(400);
    throw new Error("Password must be between 8 and 20 characters long.");
  }

  // Find the executive by id
  const executive = await Executives.findById(id);
  if (!executive) {
    resp.status(404);
    throw new Error("Executive not found.");
  }

  // Update fields if provided
  if (username) executive.username = username;
  if (email) executive.email = email;
  if (password) executive.password = await bcrypt.hash(password, 10); // Hash password if it's being updated
  if (country) executive.country = country;
  if (state) executive.state = state;
  if (city) executive.city = city;
  if (address) executive.address = address;
  if (pinCode) executive.pinCode = pinCode;
  if (selectedSuperStockist) executive.superStockistId = selectedSuperStockist;

  // Save the updated executive data
  const updatedExecutive = await executive.save();

  resp.status(200).json({
    message: "Executive updated successfully",
    updatedExecutive: {
      _id: updatedExecutive.id,
      username: updatedExecutive.username,
      email: updatedExecutive.email,
    },
  });
});

// @desc Delete an executive's record
// @route DELETE /api/users/delete/:id
// @access private

const deleteUser = asyncHandler(async (req, resp) => {
  const { id } = req.params;

  // Find the executive by id
  const executive = await Executives.findById(id);
  if (!executive) {
    resp.status(404).json({ message: "Executive not found." }); // Send response on not found
    return; // Exit early after sending the response
  }

  // Delete the executive
  await executive.deleteOne(); // or executive.remove() if using Mongoose 4.x

  resp.status(200).json({ message: "Executive deleted successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getStateCity,
  GetAllUser,
  getUserDetailsByEmail,
  getStockistBySuperByID,
  updateUser,
  deleteUser,
};
