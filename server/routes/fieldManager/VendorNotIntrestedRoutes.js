const express = require("express");
const router = express.Router();
const VendorNotIntrested = require("../../controllers/FieldManager/VendorNotIntrested");

// Create a new vendor record
router.post("/", VendorNotIntrested.createVendorNotIntrested);

// Get all vendor records
router.get("/", VendorNotIntrested.getAllVendorNotIntrested);

// Get a single vendor record by ID
// router.get("/:id", VendorNotIntrested.getVendorById);

// Update a vendor record by ID
router.put("/:id", VendorNotIntrested.updateVendorNotIntrested);

// Delete a vendor record by ID
router.delete("/:id", VendorNotIntrested.deleteVendorNotIntrested);

module.exports = router;
