// categoryController.js
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// Get all categories update 
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user_id: req.userExecutive.id });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
const createCategory = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { ProductName, Status } = req.body;

    if (!ProductName || !Status) {
        return res.status(400).json({ error: "All fields are mandatory!" });
    }

    try {
        const category = await Category.create({
            name:ProductName,
            status:Status,
            user_id: req.userExecutive.id
        });

        return res.status(201).json(category);
    } catch (error) {
        // Handle database or other errors
        console.error("Error creating category:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category by ID
const updateCategoryById = asyncHandler(async (req, resp) => {
    const contact = await Category.findById(req.params.id);
    if (!contact) {
        resp.status(404);
        throw new Error("Category not found")
    }

    const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    resp.status(200).json(updateCategory)
});

// Delete category by ID
const deleteCategoryById = asyncHandler(async (req, resp) => {
    const categoryDel = await Category.findById(req.params.id);
    if (!categoryDel) {
        resp.status(404);
        throw new Error("Category not found")
    }

    await Category.deleteOne({ _id: req.params.id });
    resp.status(200).json(categoryDel);
});

module.exports ={
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};
