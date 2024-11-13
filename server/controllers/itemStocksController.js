const asyncHandler = require('express-async-handler');
const ItemStocks = require('../models/itemStocksModel');

// @desc    Get all item stocks
// @route   GET /api/item-stocks
// @access  Public
const getItemStocks = asyncHandler(async (req, res) => {
    const itemStocks = await ItemStocks.find({ user_id: req.userExecutive.id });
    res.json(itemStocks);
});

// @desc    Get single item stock by ID
// @route   GET /api/item-stocks/:id
// @access  Public good
const getItemStockById = asyncHandler(async (req, res) => {
    const itemStock = await ItemStocks.findById(req.params.id);
    if (!itemStock) {
        res.status(404);
        throw new Error('Item stock not found');
    }
    res.json(itemStock);
});

// @desc    Create a new item stock
// @route   POST /api/item-stocks
// @access  Public
const createItemStock = asyncHandler(async (req, res, next) => {
    try {
        const {
            category,
            item,
            published,
            stockCount,
            lastStock,
            quality,
            vendor
        } = req.body;

        if (!category || !item || !published || !stockCount || !quality || !vendor) {
            res.status(400).json({ error: "category, item, published, stockCount, quality, and vendor are mandatory fields" });
            return;
        }

        // Additional input validation if needed
        
        const itemStock = await ItemStocks.create({
            category,
            item,
            published,
            stockCount,
            lastStock,
            quality,
            vendor,
            user_id: req.userExecutive.id
        });

        res.status(201).json(itemStock);
    } catch (error) {
        next(error);
    }
});

// @desc    Update an item stock by ID
// @route   PUT /api/item-stocks/:id
// @access  Public
const updateItemStock = asyncHandler(async (req, res, next) => {
    try {
        const {
            category,
            item,
            published,
            stockCount,
            lastStock,
            quality,
            vendor
        } = req.body;

        const itemStock = await ItemStocks.findById(req.params.id);

        if (!itemStock) {
            res.status(404);
            throw new Error('Item stock not found');
        }

        // Additional input validation if needed

        itemStock.category = category;
        itemStock.item = item;
        itemStock.published = published;
        itemStock.stockCount = stockCount;
        itemStock.lastStock = lastStock;
        itemStock.quality = quality;
        itemStock.vendor = vendor;

        const updatedItemStock = await itemStock.save();
        res.json(updatedItemStock);
    } catch (error) {
        next(error);
    }
});

// @desc    Delete an item stock by ID
// @route   DELETE /api/item-stocks/:id
// @access  Public
const deleteItemStock = asyncHandler(async (req, res, next) => {
    try {
        const itemStock = await ItemStocks.findById(req.params.id);
        if (!itemStock) {
            res.status(404);
            throw new Error('Item stock not found');
        }

        await itemStock.deleteOne({ _id: req.params.id });
        res.json({ message: 'Item stock removed' });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    getItemStocks,
    getItemStockById,
    createItemStock,
    updateItemStock,
    deleteItemStock
};
