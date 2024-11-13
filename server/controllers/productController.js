const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel")

// @desc Get all products
//@route GET/api/products
//@access private


const getProducts = asyncHandler(async (req, resp) => {
    const products = await Product.find({ user_id: req.userExecutive.id });
    resp.status(200).json(products)
});

// @desc GET all products
//@route GET/api/products/:id
//@access public
const getProduct = asyncHandler(async (req, resp) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        resp.status(404);
        throw new Error("product not found");
    }

    resp.status(200).json(product);
});


// @desc Create all products
//@route POST/api/products
//@access public


const createProduct = asyncHandler(async (req, res, next) => {
    const { item_name, description, units, price, status, variants } = req.body;

    // Validate request body
    if (!item_name || !description || !units || !price || !status || !variants) {
        return res.status(400).json({ error: "item_name, description, units, price, status, variants are mandatory fields" });
    }

    const product = await Product.create({
        item_name, description, units, price, status, variants,
        user_id: req.userExecutive.id
    });

    res.status(201).json(product);
});



// @desc update all products
//@route get/api/products
//@access public

const updateProduct = asyncHandler(async (req, resp) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        resp.status(404);
        throw new Error("product not found")

    }

    if (product.user_id.toString() !== req.userExecutive.id) {
        resp.status(403);
        return resp.json({ error: "User doesn't have permission to update other user's products" });
    }
    const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    resp.status(200).json(updateProduct)
})

// @desc delete all products
//@route delete/api/products/:id
//@access public

const deleteProduct = asyncHandler(async (req, resp) => {

    const productDel = await Product.findById(req.params.id);

    if (!productDel) {
        resp.status(404);
        throw new Error("product not found")

    }

    if(productDel .user_id.toString() !== req.userExecutive.id)
    {
        resp.status(403);
        throw new Error("User dont't have permission to other user products");
    }

    await Product.deleteOne({ _id: req.params.id });




    resp.status(200).json(productDel);
});



module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }