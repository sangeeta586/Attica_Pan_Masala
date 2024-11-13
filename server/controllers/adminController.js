const Admin = require('../models/admin'); // Admin model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to create a new Admin (Registration updated)
exports.createAdmin = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to update Admin details
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedAdmin = await Admin.findById(id);
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update admin data
    updatedAdmin.username = username || updatedAdmin.username;
    updatedAdmin.email = email || updatedAdmin.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedAdmin.password = await bcrypt.hash(password, salt);
    }

    await updatedAdmin.save();
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete Admin
exports.deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
