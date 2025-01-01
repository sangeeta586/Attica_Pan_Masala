const express = require("express");
const {
  createShowCase,
  findShowCase,
  findShowCaseById,
  updateShowCaseById,
  deleteShowCaseById,
  findShowCaseByfieldManagerId
} = require("../../controllers/FieldManager/showCaseController");

const router = express.Router();

// Route to create a new ShowCase
router.post("/showcase", createShowCase);
router.get("/showcase", findShowCase);

// Route to update a ShowCase

router.put("/showcase/:id", updateShowCaseById);

// Route to delete a ShowCase

router.delete("/showcase/:id", deleteShowCaseById);

// Route to get a ShowCase by ID

router.get("/showcase/:id", findShowCaseById);
router.get("/getByfieldManagerId/:fieldManagerId", findShowCaseByfieldManagerId);

module.exports = router;
