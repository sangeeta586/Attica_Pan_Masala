const express=require('express')

const router=express.Router();


const {createProductStock, getAllProductStock, getProductStockById, updateProductStockById, deleteProductStockById} =require('../controllers/productStockController');

const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken)

// Create a new  products
router.route('/').post(createProductStock);

// Get all   products
router.route('/').get(getAllProductStock);

// Get  products by ID
router.route('/:id').get(getProductStockById);

// Update  products by ID
router.route('/:id').put(updateProductStockById);

// Delete  products by ID
router.route('/:id').delete(deleteProductStockById);

module.exports = router;