const express = require("express");
const router = express.Router();
const {
  registerQrGeneraterBoy,
  loginUser,
  currentUser,
  getAllDeliveryBoyDeatils,
  updatePassword,
  getDeliveryBoyById,
  updateDeliveryBoyDetails,
  deleteDeliveryBoyDetails,
  findOrderByDeliveryBoyId
} = require("../controllers/deliveryBoyController");
const validateToken = require("../middleware/qrGeneraterBoyValidateTokenHandler");

// Register
router.post("/register", registerQrGeneraterBoy);

//Login
router.post("/login", loginUser);

// Current user information
router.get("/current", validateToken, currentUser);
router.get("/allDetailsDeliverBoy", getAllDeliveryBoyDeatils);
router.put("/update-password/:id", updatePassword);

// Get delivery boy by id

router.get("/:id", getDeliveryBoyById);

// Update delivery boy details

router.put("/:id", updateDeliveryBoyDetails);

// Delete delivery boy details

router.delete("/:id", deleteDeliveryBoyDetails);

// Get order by delivery boy id

router.get("/order/:id", findOrderByDeliveryBoyId);

module.exports = router;


