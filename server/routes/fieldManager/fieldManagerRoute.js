const express = require("express");
const router = express.Router();
const FieldManagerController = require("../../controllers/FieldManager/LoginController");

// Get all FieldManagers
router.post("/register", FieldManagerController.registerFieldManager);
router.post("/login", FieldManagerController.login);
router.get("/getFieldManager", FieldManagerController.getFieldManager);



router.put("/update/:id", FieldManagerController.updateFieldManager);
router.get("/getFieldManager/:id", FieldManagerController.getByIdFieldManager);
router.delete(
  "/getFieldManager/delete/:id",
  FieldManagerController.deleteByIdFieldManager
);

router.post('/logout/:id', FieldManagerController.logout);

module.exports = router;
