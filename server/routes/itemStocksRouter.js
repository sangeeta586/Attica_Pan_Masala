const express = require('express');
const router = express.Router();
const {
    getItemStocks,
    getItemStockById,
    createItemStock,
    updateItemStock,
    deleteItemStock
} = require('../controllers/itemStocksController');

// Middleware to parse JSON body
router.use(express.json());

const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

// Routes
router.get('/', getItemStocks); // Get all item stocks
router.post('/', createItemStock); // Create a new item stock
router.get('/:id', getItemStockById); // Get single item stock by ID
router.put('/:id', updateItemStock); // Update an item stock by ID
router.delete('/:id', deleteItemStock); // Delete an item stock by ID

module.exports = router;
