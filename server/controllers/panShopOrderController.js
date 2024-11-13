const asyncHandler = require("express-async-handler");
const PanShopOrder = require('../models/panShopOrderModel');
const PanShopOwner = require("../models/panShopOwnerModel");
const qrcode = require('qrcode'); // Add QR code generation
const fs = require('fs'); // Add file system module for file handling

// Create a new Pan Shop Order
const createPanShopOrder = asyncHandler(async (req, res) => {
  const { products, superStockistEmail, stockistEmail, panShopOwner_id,panShopOwnerName, panShopOwnerstate, panShopOwneraddress, status, deliveryTime, assignTo,otp } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Products array is required and cannot be empty" });
  }

  const totalPrice = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

  try {
    const order = await PanShopOrder.create({
      products,
      totalPrice,
      superStockistEmail,
      stockistEmail,
      panShopOwner_id,
      panShopOwnerName,
      panShopOwnerstate,
      panShopOwneraddress,
      status,
      deliveryTime,
      assignTo,
      otp
    });

    res.status(201).json(order); // Return the created order
  } catch (error) {
    console.error("Error creating pan shop order:", error);
    res.status(500).json({ error: "Failed to create pan shop order" });
  }
});

// Get a Pan Shop Order by ID
const getPanShopOrderById = asyncHandler(async (req, res) => {
  const order = await PanShopOrder.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order detail not found");
  }
  res.status(200).json(order);
});

// Delete a Pan Shop Order by ID
const deletePanShopOrderById = asyncHandler(async (req, res) => {
  const order = await PanShopOrder.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order detail not found");
  }

  await order.deleteOne();

  res.status(200).json({ message: "Order deleted successfully" });
});

// Update Email, AssignTo, and Delivery Time for an Order
const assignedToorderStockitAndSuperStockit = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const existingOrder = await PanShopOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const {
      superStockistEmail,
      stockistEmail,
      status
    } = req.body;

    // Update specific fields if they exist in the request body
    if (superStockistEmail) existingOrder.superStockistEmail = superStockistEmail;
    if (stockistEmail) existingOrder.stockistEmail = stockistEmail;
    if (status) existingOrder.status = status; // Update order status if provided

    // Save the updated order
    const updatedOrder = await existingOrder.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating panShop order:", error);
    res.status(500).json({ error: "An error occurred while updating the panShop order" });
  }
});



const assignToOrderToDeliverBoy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { deliverBoyId,deliveryTime } = req.body;

  try {
    // Check if the order exists
    const existingOrder = await PanShopOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Ensure deliverBoyId is provided
    if (!deliverBoyId) {
      return res.status(400).json({ error: "Delivery boy ID is required" });
    }

    // Assign deliverBoyId and update order status
    existingOrder.deliveryBoyId = deliverBoyId;
    existingOrder.status = "confirmed";
    existingOrder.deliveryTime = deliveryTime; // Update delivery time if provided

    // Save the updated order
    const updatedOrder = await existingOrder.save();
    res.status(200).json({ message: "Order assigned to delivery boy successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating panShop order:", error);
    res.status(500).json({ error: "An error occurred while assigning the order" });
  }
});




// Get All Pan Shop Orders
const getPanShopOrder = asyncHandler(async (req, res) => {
  try {
    const orders = await PanShopOrder.find().populate({
      path: 'deliveryBoyId',
       
    }).populate({path:'panShopOwner_id'});

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get Pan Shop Owner by ID with QR Code generation
const getPanShopOwnerById = asyncHandler(async (req, resp) => {
  const owner = await PanShopOwner.findById(req.params.id);

  if (!owner) {
    resp.status(404);
    throw new Error("PanShop Owner Not Found");
  }

  try {
    // Generate QR code data
    const qrData = `https://atticapanmasala-ecommerce.onrender.com/login/${owner._id}`;

    // Generate QR code image
    const qrImageFilePath = `qr_${owner._id}.png`; // File path for the QR code image
    await qrcode.toFile(qrImageFilePath, qrData);

    // Read the QR code image file as a buffer
    const qrImageData = fs.readFileSync(qrImageFilePath);

    // Delete the QR code image file after reading it
    fs.unlinkSync(qrImageFilePath);

    // Convert QR code image data to base64
    const qrCodeBase64 = qrImageData.toString('base64');

    // Send the pan shop owner details along with the base64 representation of the QR code
    resp.status(200).json({ qrCodeBase64, owner });
  } catch (error) {
    resp.status(500).json({ error: "Failed to generate QR code" });
  }
});

// Get All Order History by Pan Shop Owner ID
const getAllOrderHistroyByShopOwnerId = asyncHandler(async (req, resp) => {
  try {
    const id = req.params.id;
    const owner = await PanShopOwner.findById(id);

    if (!owner) {
      return resp.status(404).json({ message: "User Doesn't Exist" });
    }

    const orders = await PanShopOrder.aggregate([
      {
        $match: {
          panShopOwner_id: id // Ensure correct field name
        }
      },
      {
        $project: {
          _id: 1,
          "products.productNames": 1,
          "products.quantity": 1,
          "products.price": 1,
          totalPrice: 1,
          superStockistEmail: 1,
          stockistEmail: 1,
          panShopOwner_id: 1,
          panShopOwnerName: 1,
          panShopOwneraddress: 1,
          panShopOwnerstate: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1
        }
      }
    ]);

    resp.status(200).json({ success: true, orders });
  } catch (error) {
    resp.status(500).json({ success: false, message: "An error occurred while retrieving orders" });
  }
});


const updateAssignDeliveryTime = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const existingOrder = await PanShopOrder.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { assignTo, deliveryTime, status, ...updateData } = req.body;

    // Update specific fields if they exist in the request body
    if (assignTo) existingOrder.assignTo = assignTo;
    if (deliveryTime) existingOrder.deliveryTime = deliveryTime;
    if (status) existingOrder.status = status;

    // Loop through updateData to update any other fields
    for (let key in updateData) {
      existingOrder[key] = updateData[key];
    }

    // Save the updated order
    const updatedOrder = await existingOrder.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating panShop order:", error);
    res.status(500).json({ error: "An error occurred while updating the panShop order assignTo and DeliveyTime" });
  }
});

const matchOtp=asyncHandler(async(req,res)=>{
  try {
   const order=await PanShopOrder.findById(req.params.id)
   if (!order) {
     res.status(404);
     throw new Error(" order detail not found");
   }
    const {otp}=req.body;
    if(order.otp===otp){
     // res.status(200).json({message: "otp Match the data "})
     if(order.status==="pending"){
       order.status="delivered"
       order.save()
      // res.status(200).json(order)
     }
     res.status(200).json({order,message: "otp Match the data"})
    }
    else{
     res.status(404).json({message:"otp not match the data "})
    }
 
  } catch (error) {
   console.error("Error not geytting the order:", error);
     res.status(500).json({ error: "An error occurred while Getting the otp " });
   }
 })

module.exports = {
  createPanShopOrder,
  getPanShopOrderById,
  assignedToorderStockitAndSuperStockit,
  getPanShopOrder,
  deletePanShopOrderById,
  getPanShopOwnerById,
  getAllOrderHistroyByShopOwnerId,
  updateAssignDeliveryTime,
  matchOtp,
  assignToOrderToDeliverBoy
  
 
};
