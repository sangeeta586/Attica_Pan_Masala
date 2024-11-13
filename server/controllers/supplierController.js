const asyncHandler = require('express-async-handler');
const Supplier = require('../models/supplierModel');

// @desc    Get all Suppliers
// @route   GET /api/suppliers
// @access  Public
const getSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({ user_id: req.userExecutive.id });
    res.json(suppliers);
});

// @desc    Get single Supplier by ID
// @route   GET /api/suppliers/:id
// @access  Public
const getSupplierById = asyncHandler(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
        res.status(404);
        throw new Error('Supplier not found');
    }
    res.json(supplier);
});

// @desc    Create a new Supplier
// @route   POST /api/suppliers
// @access  Public
const createSupplier = asyncHandler(async (req, res) => {
    const { name, address, products } = req.body;
    
    if (!name || !address || !products || products.length === 0) {
        res.status(400);
        throw new Error('Name, address, and products are mandatory fields and at least one product must be provided');
    }

    const supplier = await Supplier.create({
        name,
        address,
        products,
        user_id: req.userExecutive.id
    });

    res.status(201).json(supplier);
});

// @desc    Update a Supplier by ID
// @route   PUT /api/suppliers/:id
// @access  Public
const updateSupplier = asyncHandler(async (req, res) => {
    const { name, address, products } = req.body;

    if (!name || !address || !products || products.length === 0) {
        res.status(400);
        throw new Error('Name, address, and products are mandatory fields and at least one product must be provided');
    }

    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
        res.status(404);
        throw new Error('Supplier not found');
    }

    supplier.name = name;
    supplier.address = address;
    supplier.products = products;

    const updatedSupplier = await supplier.save();
    res.json(updatedSupplier);
});

// @desc    Delete a Supplier by ID
// @route   DELETE /api/suppliers/:id
// @access  Public
const deleteSupplier = asyncHandler(async (req, resp) => {

    const supplierDel = await Supplier.findById(req.params.id);

    if (!supplierDel) {
        resp.status(404);
        throw new Error("i supplier not found")

    }

    if( supplierDel.user_id.toString() !== req.userExecutive.id)
    {
        resp.status(403);
        throw new Error("User dont't have permission to other user item");
    }

    await Supplier.deleteOne({ _id: req.params.id });




    resp.status(200).json(supplierDel);
});

module.exports = {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier
};
