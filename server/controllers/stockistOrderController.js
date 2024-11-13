const asyncHandler = require("express-async-handler");
const StockistOrder = require("../models/stockistOrderModel");
const mongoose = require("mongoose")

// Current User Information
const currentUser = asyncHandler(async (req, res) => {
  const { userExecutive } = req;

  if (!userExecutive) {
    res.status(401).json({ error: "User is not authenticated" });
    return;
  }

  res.status(200).json({
    username: userExecutive.username,
    email: userExecutive.email,
    id: userExecutive.id,
    message: "Current user information",
  });
});

// Get All Stockist Orders
const getStockistOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await StockistOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching stockist orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders" });
  }
});

// Get a Stockist Order by ID
const getStockistOrder = asyncHandler(async (req, res) => {
  try {
    const order = await StockistOrder.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    // Authorization check
    if (order.user_id.toString() !== req.user.id) {
      res.status(403).json({ error: "User doesn't have permission to access this order" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching stockist order:", error);
    res.status(500).json({ error: "An error occurred while fetching the order" });
  }
});

// Create a New Stockist Order
const createStockistOrder = asyncHandler(async (req, res) => {
  const { products,status , date, time,  message ,stockistMessage,superstockistEmail } = req.body;
   console.log(products ,status);
  if (!products  || !Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: "At least one product must be provided." });
    return;
  }

  const { userExecutive } = req;

  if (!userExecutive) {
    res.status(401).json({ error: "User is not authenticated." });
    return;
  }

  try {
    const newOrder = await StockistOrder.create({
      products,
      status,
      date,
      time,
      message,
      stockistMessage,
      superstockistEmail,
      username: userExecutive.username,
      email: userExecutive.email,
      
    });
    console.log(newOrder);
    res.status(201).json({ message: "Stockist order created successfully.", order: newOrder });
  } catch (error) {
    console.error("Error creating stockist order:", error);
    res.status(500).json({ error: "An error occurred while creating the stockist order." });
  }
});






// Delete a Stockist Order


// Delete a stockist order by ID
const deleteStockistOrder = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.id;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      res.status(400).json({ error: "Invalid order ID format." });
      return;
    }

    // Find the stockist order by ID
    const order = await StockistOrder.findById(orderId);

    await StockistOrder.deleteOne({ _id: orderId });

    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting stockist order:", error);
    res.status(500).json({ error: "An error occurred while deleting the order." });
  }
});

const updateStockistOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the provided order ID is a valid MongoDB object ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  try {
    
    const existingOrder = await StockistOrder.findById(id);

    // Check if the stockist order exists
    if (!existingOrder) {
      return res.status(404).json({ error: "Stockist order not found" });
    }

    const { date, time, message,stockistMessage, ...updateData } = req.body;
    // console.log( date, time, message,stockistMessage);

    // Update the stockist order with the provided data including date, time, and message
    const updatedOrder = await StockistOrder.findByIdAndUpdate(
      id,
      {
        ...updateData, // Update the existing fields
        date, // Add or update the date field
        time, // Add or update the time field
        message ,// Add or update the message field
        stockistMessage
      },
      { new: true }
    );
  console.log(updatedOrder);

    // Return the updated stockist order in the response
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating stockist order:", error);
    res.status(500).json({ error: "An error occurred while updating the stockist order" });
  }
});

const updateStockistOrderPaticular = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the provided order ID is a valid MongoDB object ID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  try {
    const existingOrder = await StockistOrder.findById(id);

    // Check if the stockist order exists
    if (!existingOrder) {
      return res.status(404).json({ error: "Stockist order not found" });
    }

    // Extract fields from the request body for partial update
    const { status, date, time, message,stockistMessage, ...updateData } = req.body;
    // console.log(status, date, time, message,stockistMessage);

    // Apply partial updates to the existing order
    if (status) existingOrder.status = status;
    if (date) existingOrder.date = date;
    if (time) existingOrder.time = time;
    if (message) existingOrder.message = message;
    if(stockistMessage) existingOrder.stockistMessage=stockistMessage;
    // Update other fields as necessary
    for (let key in updateData) {
      existingOrder[key] = updateData[key];
    }

    // Save the updated order
    const updatedOrder = await existingOrder.save();

    // Return the updated stockist order in the response
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating stockist order:", error);
    res.status(500).json({ error: "An error occurred while updating the stockist order" });
  }
});



module.exports = {
  getStockistOrders,
  getStockistOrder,
  createStockistOrder,
  updateStockistOrder,
  deleteStockistOrder,
  currentUser,
updateStockistOrderPaticular
 
};