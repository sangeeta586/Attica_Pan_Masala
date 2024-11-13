const asyncHandler = require("express-async-handler");
const ProductStock = require("../models/productStockModel");

// Get all product stock entries for the authenticated user
const getAllProductStock = async (req, res) => {
    try {
        const products = await ProductStock.find({user_id: req.userExecutive.id});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new product stock entry
const createProductStock = asyncHandler(async (req, res) => {
    const { category, product_name, published, stockCount, lastCount, quality, vendor } = req.body;

    try {
        if (!category || !product_name || !published || !stockCount || !lastCount || !quality || !vendor) {
            res.status(400).json({ error: "All fields are mandatory" });
            return;
        }

        const product = await ProductStock.create({
            category,
            product_name,
            published,
            stockCount,
            lastCount,
            quality,
            vendor,
            user_id: req.userExecutive.id
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a product stock entry by its ID
const getProductStockById = async (req, res) => {
    try {
        const product = await ProductStock.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product stock entry by its ID
const updateProductStockById = asyncHandler(async (req, res) => {
    try {
        const product = await ProductStock.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.user_id.toString() !== req.userExecutive.id) {
            return res.status(403).json({ error: "User doesn't have permission to update other user's product stock" });
        }
        const updatedProduct = await ProductStock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a product stock entry by its ID
const deleteProductStockById = asyncHandler(async (req, res) => {
    try {
        const product = await ProductStock.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (product.user_id.toString() !== req.userExecutive.id) {
            return res.status(403).json({ error: "User doesn't have permission to delete other user's product stock" });
        }
        await ProductStock.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {
    createProductStock,
    getAllProductStock,
    getProductStockById,
    updateProductStockById,
    deleteProductStockById
};
