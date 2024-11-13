const express = require("express");
const {
    createPanShopOrder,
    getPanShopOrderById,
    assignedToorderStockitAndSuperStockit,
    getPanShopOrder,
    // getTodays24HoursSell
    deletePanShopOrderById,
    assignToOrderToDeliverBoy
} = require("../controllers/panShopOrderController");

const router = express.Router();

router.route("/")
    .post(createPanShopOrder)
    .get(getPanShopOrder);

router.route("/:id")
    .get(getPanShopOrderById)
    .patch(assignedToorderStockitAndSuperStockit)
    .delete(deletePanShopOrderById)


router.route("/assignedToDeliverBoy/:id").patch(assignToOrderToDeliverBoy);




module.exports = router;
