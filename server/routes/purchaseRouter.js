const express = require("express");
const router = express.Router();


const{getPurchases,createPurchase,updatePurchase,getPurchase,deletePurchase}=require("../controllers/purchaseController")
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getPurchases);

router.route("/").post(createPurchase);

router.route("/:id").get(getPurchase);

router.route("/:id").put(updatePurchase);

router.route("/:id").delete(deletePurchase);



module.exports = router;