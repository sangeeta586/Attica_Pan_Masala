const asyncHandler = require("express-async-handler");

const Supplies = require("../models/suppliesModel")

// @desc Get all suppliess
//@route GET/api/suppliess
//@access private


const getSuppliess = asyncHandler(async (req, resp) => {
    const suppliess = await Supplies.find({ user_id: req.userExecutive.id });
    resp.status(200).json(suppliess)
});

// @desc GET all suppliess
//@route GET/api/suppliess/:id
//@access public
const getSupplies = asyncHandler(async (req, resp) => {
    const supplies = await Supplies.findById(req.params.id);
    if (!supplies) {
        resp.status(404);
        throw new Error("supplies not found");
    }

    resp.status(200).json(supplies);
});


// @desc Create all suppliess
//@route POST/api/suppliess
//@access public


const createSupplies = asyncHandler(async (req, resp) => {
    console.log("The request body is :", req.body);
    const { name, products, quantity, price } = req.body;
    if (!name || !products || !quantity || !price) {
        resp.status(400);
        throw new Error("All fields are mandatory !");
    }
    const supplies = await Supplies.create({
        name,
        products,
        quantity,
        price,
        user_id: req.userExecutive.id
    });
    resp.status(201).json(supplies);
});


// @desc update all suppliess
//@route get/api/suppliess
//@access public

const updateSupplies = asyncHandler(async (req, resp) => {
    const supplies = await Supplies.findById(req.params.id);
    if (!supplies) {
        resp.status(404);
        throw new Error("supplies not found")

    }

    if (supplies.user_id.toString() !== req.userExecutive.id) {
        resp.status(403);
        return resp.json({ error: "User doesn't have permission to update other user's suppliess" });
    }
    const updateSupplies = await Supplies.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    resp.status(200).json(updateSupplies)
})

// @desc delete all suppliess
//@route delete/api/suppliess/:id
//@access public

const deleteSupplies = asyncHandler(async (req, resp) => {

    const suppliesDel = await Supplies.findById(req.params.id);

    if (!suppliesDel) {
        resp.status(404);
        throw new Error("supplies not found")

    }

    if(suppliesDel .user_id.toString() !== req.userExecutive.id)
    {
        resp.status(403);
        throw new Error("User dont't have permission to other user suppliess");
    }

    await Supplies.deleteOne({ _id: req.params.id });




    resp.status(200).json(suppliesDel);
});



module.exports = { getSuppliess, getSupplies, createSupplies, updateSupplies, deleteSupplies }