const asyncHandler = require("express-async-handler");

const Item = require("../models/itemModel")

// @desc Get all Item
//@route GET/api/items
//@access private updated


const getItems = asyncHandler(async (req, resp) => {
    const items = await Item.find({ user_id: req.userExecutive.id });
    resp.status(200).json(items)
});

// @desc GET item
//@route GET/api/contacts/:id
//@access public
const getItem = asyncHandler(async (req, resp) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        resp.status(404);
        throw new Error("item not found");
    }

    resp.status(200).json(item);
});


// @desc Create all contacts
//@route POST/api/contacts
//@access public


const createItem = asyncHandler(async (req, resp) => {
    console.log("The request body is :", req.body);
    const { itemName,   description, units ,price } = req.body;
    if (!itemName || !description || !units || !price) {
        resp.status(400);
        throw new Error("All fields are mandatory !")

    }
    const item = await Item.create({
        itemName,
        description,
        units,
        price,
        user_id: req.userExecutive.id
    });
    resp.status(201).json(item)
})



// @desc update all items
//@route get/api/items
//@access public

const updateItem = asyncHandler(async (req, resp) => {
    const item = await Item.findById(req.params.id);
    if (!item) {
        resp.status(404);
        throw new Error("item not found")

    }

    if (item.user_id.toString() !== req.userExecutive.id) {
        resp.status(403);
        return resp.json({ error: "User doesn't have permission to update other user's items" });
    }
    const updateItem = await Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    resp.status(200).json(updateItem)
})

// @desc delete all item
//@route delete/api/item/:id
//@access public

const deleteItem = asyncHandler(async (req, resp) => {

    const itemDel = await Item.findById(req.params.id);

    if (!itemDel) {
        resp.status(404);
        throw new Error("item not found")

    }

    if(itemDel.user_id.toString() !== req.userExecutive.id)
    {
        resp.status(403);
        throw new Error("User dont't have permission to other user item");
    }

    await Item.deleteOne({ _id: req.params.id });




    resp.status(200).json(itemDel);
});



module.exports = { getItems, getItem, createItem, updateItem, deleteItem }