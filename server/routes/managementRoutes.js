const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
  updateAdministratorDetails,
  getAllAdministrators,
  deleteAdministrator
} = require("../controllers/managementController");
const validateToken = require("../middleware/validateTokenHandler");

// Register
router.post("/register", registerUser);

//Login
router.post("/login", loginUser);

//update password
router.put("/update/:id", updateAdministratorDetails);

//get all users
router.get("/users", getAllAdministrators);

// Current user information

router.get("/current", validateToken, currentUser);

//delete user

router.delete("/delete/:id", deleteAdministrator);



module.exports = router;