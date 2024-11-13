const express = require("express");
const router = express.Router();
const { getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,  
    getOrdersGroupedByState,
    getOrdersGroupedByCity ,
    getMonthlyOrderQty
     } = require("../controllers/salesController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");
// Route without validation middleware
router.route("/getOrdersGroupedByState").get(getOrdersGroupedByState);
router.route("/getOrdersGroupedByCity").get(getOrdersGroupedByCity );
router.route("/getMonthlyOrderQty").get(  getMonthlyOrderQty );


// Applying middleware to routes
router.route("/").get(executiveValidateToken, getSales);
router.route("/").post(executiveValidateToken, createSale);
router.route("/:id").get(executiveValidateToken, getSaleById);
router.route("/:id").put(executiveValidateToken, updateSale);
router.route("/:id").delete(executiveValidateToken, deleteSale);




module.exports = router;
