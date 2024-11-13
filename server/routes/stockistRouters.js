const express = require('express');
const router = express.Router();
const mongoose=require("mongoose")
const {
  getStockistOrders,
  createStockistOrder,
  getStockistOrder,
  updateStockistOrder,
  deleteStockistOrder,
  currentUser,
  updateStockistOrderStatus
} = require('../controllers/stockistOrderController'); // Ensure the correct path to your controller
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");
const StockistOrder = require("../models/stockistOrderModel");
const asyncHandler = require("express-async-handler");






// Define routes for CRUD operations on Stockist Orders

// router.route('/current').get(currentUser)
router.get("/current",executiveValidateToken,currentUser)
router.route('/')

  .get(getStockistOrders)
  // Get all stockist orders for the current user
  // .post(createStockistOrder)
  router.post("/",executiveValidateToken,createStockistOrder)
  ; // Create a new stockist order

  router.delete("/:id", executiveValidateToken, deleteStockistOrder);
  // Delete a specific stockist order by ID


  // Get a single stockist order by ID
router.route('/:id').get(asyncHandler(async (req, res) => {
  try {
    // Ensure the ID is a valid ObjectId
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      // If ID is invalid, return a 400 error with a clear message
      res.status(400).json({ error: "Invalid order ID format." });
      return;
    }

    // Find the stockist order by ID
    const order = await StockistOrder.findById(orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching stockist order:", error);
    res.status(500).json({ error: "An error occurred while fetching the order." });
  }
}));



  // PUT a single stockist order by ID
 // Middleware to validate ObjectId
 const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid order ID format." });
    return;
  }
  next();
};

router.put("/:id", executiveValidateToken, validateObjectId, asyncHandler(updateStockistOrder));

// router.route('/:id').put(executiveValidateToken, asyncHandler(updateStockistOrder))
  

module.exports = router;