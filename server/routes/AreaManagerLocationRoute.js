// locationRoutes.js
const express = require("express");
const router = express.Router();
const {
  saveLocation,
  getLocation,
} = require("../controllers/AreaManagerLocationController");

// Save location
router.post("/", saveLocation);
router.get("/get/:id", getLocation);
module.exports = router;