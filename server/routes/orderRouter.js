const express = require("express");
const router = express.Router();
const { getOrders, createOrder, getOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getOrders);

router.route("/").post(createOrder);

router.route("/:id").get(getOrder);


router.route("/:id").put(updateOrder);


router.route("/:id").delete(deleteOrder);



module.exports = router;