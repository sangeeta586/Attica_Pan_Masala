const express = require("express");
const router = express.Router();
const {
  getSuperStockistProducts,
  getSuperStockistProduct,
  createSuperStockistProduct,
  updateSuperStockistProduct,
  deleteSuperStockistProduct,
  allSuperStockistsProductSell,
} = require("../controllers/superstockistProductController");
const validateToken = require("../middleware/superStockistValidateTokenHandler"); // Middleware for authentication

// Apply authentication middleware to all routes
// router.use(validateToken);

// Route to get all products for the current user or to create a new product
router.route("/")
  .get(getSuperStockistProducts,validateToken)
   // GET /api/superstockistproducts
  .post(createSuperStockistProduct,validateToken);
   // POST /api/superstockistproducts
router.route("/productsDetails").get(allSuperStockistsProductSell);
// Route to get, update, or delete a specific product by ID
router.route("/:id")
  .get(getSuperStockistProduct,validateToken) // GET /api/superstockistproducts/:id
  .put(updateSuperStockistProduct,validateToken) // PUT /api/superstockistproducts/:id
  .delete(deleteSuperStockistProduct,validateToken); // DELETE /api/superstockistproducts/:id

module.exports = router;
