const express = require('express');
const router = express.Router();
const {createCategory,getAllCategories,getCategoryById,updateCategoryById,deleteCategoryById} = require('../controllers/categoryController');
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);
// Create a new category
router.route('/').post(createCategory);

// Get all categories
router.route('/').get(getAllCategories);

// Get category by ID
router.route('/:id').get(getCategoryById);

// Update category by ID
router.route('/:id').put(updateCategoryById);

// Delete category by ID
router.route('/:id').delete(deleteCategoryById);

module.exports = router;
