const express = require("express");
const router = express.Router();
const inspectionShopController = require("../../controllers/FieldManager/inspectionShopController");

// POST request to create inspection shop details
router.post("/create", inspectionShopController.createInspectionShop);
router.get("/getinspection/shop", inspectionShopController.getInspectionShop);
router.get("/shop-location/:id", inspectionShopController.getShopLocationById);
router.put(
  "/update/inspections/:id",
  inspectionShopController.updateInspectionShop
);

router.delete("/delete/:id", inspectionShopController.deleteInspectionShop);
router.put("/status/:id", inspectionShopController.updateStatus);

module.exports = router;
