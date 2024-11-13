const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
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

const GetAllUser = asyncHandler(async (req, resp) => {
  const getAllUser = await Executives.find();
  resp.status(200).json(getAllUser);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getStateCity,
  GetAllUser,
};