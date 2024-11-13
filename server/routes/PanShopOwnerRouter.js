const express = require("express");

const router = express.Router();

const { createPanShopOwner, getAllPanShopOwner, getPanShopOwnerById, updatePanShoperOwner, deletePanShopOwner } = require("../controllers/panShopController");

router.route("/").post(createPanShopOwner)

router.route("/").get(getAllPanShopOwner);



router.route("/:id").get(getPanShopOwnerById);


router.route("/:id").put(updatePanShoperOwner);


router.route("/:id").delete(deletePanShopOwner);


module.exports = router;