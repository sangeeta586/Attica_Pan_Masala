const asyncHandler = require("express-async-handler");
const Purchase = require("../models/purchaseMode");

// @desc Get all Purchases
// @route GET /api/purchases
// @access Private
const getPurchases = asyncHandler(async (req, res) => {
    const purchases = await Purchase.find({ user_id: req.userExecutive.id });
    res.json(purchases);
});

// @desc Get single Purchase
// @route GET /api/purchases/:id
// @access Public public
const getPurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
        res.status(404);
        throw new Error("Purchase not found");
    }
    res.json(purchase);
});

// @desc Create a Purchase
// @route POST /api/purchases
// @access Public

const createPurchase = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { vendor, products , category} = req.body; // Removed category
    if (!vendor || !products || !category) {
        res.status(400).json({ error: "Vendor and products are mandatory fields!" });
        return;
    }
    
    // Assuming Purchase is your model for purchases
    const purchase = await Purchase.create({
        vendor,
        products,
        category,
        user_id: req.userExecutive.id // Assuming userExecutive contains user information
    });
    
    res.status(201).json(purchase);
})



// @desc Update a Purchase
// @route PUT /api/purchases/:id
// @access Private
const updatePurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
        res.status(404);
        throw new Error("Purchase not found");
    }
    if (purchase.user_id.toString() !== req.userExecutive.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update this purchase");
    }
    const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPurchase);
});

// @desc Delete a Purchase
// @route DELETE /api/purchases/:id
// @access Private
const deletePurchase = asyncHandler(async (req, res) => {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase) {
        res.status(404);
        throw new Error("Purchase not found");
    }
    if (purchase.user_id.toString() !== req.userExecutive.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete this purchase");
    }
    await purchase.deleteOne({ _id: req.params.id });
    res.json({ message: "Purchase removed" });
});

module.exports = {getPurchases,createPurchase,updatePurchase,getPurchase,deletePurchase };
