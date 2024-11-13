const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Routes
router.post('/register', AdminController.createAdmin);  // Create admin (registration)
router.put('/update/:id', AdminController.updateAdmin); // Update admin
router.delete('/delete/:id', AdminController.deleteAdmin); // Delete admin
router.post('/login', AdminController.loginAdmin); // Login

module.exports = router;
