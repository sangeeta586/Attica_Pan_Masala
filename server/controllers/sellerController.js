const asyncHandler = require("express-async-handler");
const Seller = require("../models/sellerModel");

// @desc Get all sellers
// @route GET /api/sellers
// @access Private
const getSellers = asyncHandler(async (req, res) => {
    const sellers = await Seller.find({ user_id: req.userExecutive.id });
    res.json(sellers);
});

// @desc Get a single seller by ID
// @route GET /api/sellers/:id
// @access Public
const getSeller = asyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
        res.status(404);
        throw new Error("Seller not found");
    }
    res.json(seller);
});

// @desc Create a seller
// @route POST /api/sellers
// @access Public
const createSeller = asyncHandler(async (req, res, next) => {
    const { name, address, products } = req.body;

    // Validate request body
    if (!name || !address || !products) {
        return next({ statusCode: 400, message: "All fields are mandatory: name, address, and products" });
    }

    try {
        const seller = await Seller.create({
            name,
            address,
            products,
            user_id: req.userExecutive.id
        });
        res.status(201).json(seller);
    } catch (error) {
        next({ statusCode: 500, message: "Failed to create seller" });
    }
});

// @desc Update a seller by ID
// @route PUT /api/sellers/:id
// @access Private
const updateSeller = asyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
        res.status(404);
        throw new Error("Seller not found");
    }
    if (seller.user_id.toString() !== req.userExecutive.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update this seller");
    }
    const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSeller);
});

// @desc Delete a seller by ID
// @route DELETE /api/sellers/:id
// @access Private
const deleteSeller = asyncHandler(async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
        res.status(404);
        throw new Error("Seller not found");
    }
    if (seller.user_id.toString() !== req.userExecutive.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete this seller");
    }
    await seller.deleteOne();
    res.json({ message: "Seller removed" });
});

module.exports = {
    getSellers,
    getSeller,
    createSeller,
    updateSeller,
    deleteSeller
};
