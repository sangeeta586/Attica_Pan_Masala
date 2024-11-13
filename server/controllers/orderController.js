const asyncHandler = require("express-async-handler");

const Order = require("../models/orderModel")

// @desc Get all orders
//@route GET/api/orders
//@access private


const getOrders = asyncHandler(async (req, resp) => {
    const orders = await Order.find({ user_id: req.userExecutive.id });
    resp.status(200).json(orders)
});

// @desc GET all orders
//@route GET/api/orders/:id
//@access publics
const getOrder = asyncHandler(async (req, resp) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        resp.status(404);
        throw new Error("order not found");
    }

    resp.status(200).json(order);
});






// @desc Create a new order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { supplier, products, quantity, status } = req.body;

    // Validate request body
    if (!supplier || !products || !quantity) {
        res.status(400);
        throw new Error("Supplier, products, and quantity are mandatory fields");
    }

    // Create the order
    const order = await Order.create({
        supplier,
        products,
        quantity,
        status: status || "pending", // Default status is pending if not provided
        user_id: req.userExecutive.id
    });

    res.status(201).json(order);
});



// @desc update all orders
//@route get/api/orders
//@access public

const updateOrder = asyncHandler(async (req, resp) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        resp.status(404);
        throw new Error("order not found")

    }

    if (order.user_id.toString() !== req.userExecutive.id) {
        resp.status(403);
        return resp.json({ error: "User doesn't have permission to update other user's orders" });
    }
    const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    resp.status(200).json(updateOrder)
})

// @desc delete all orders
//@route delete/api/orders/:id
//@access public

const deleteOrder = asyncHandler(async (req, resp) => {

    const orderDel = await Order.findById(req.params.id);

    if (!orderDel) {
        resp.status(404);
        throw new Error("order not found")

    }

    if(orderDel .user_id.toString() !== req.userExecutive.id)
    {
        resp.status(403);
        throw new Error("User dont't have permission to other user orders");
    }

    await Order.deleteOne({ _id: req.params.id });




    resp.status(200).json(orderDel);
});



module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder }