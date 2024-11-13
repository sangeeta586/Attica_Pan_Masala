const express = require("express");
const router = express.Router();
const { getSuppliess, createSupplies, getSupplies, updateSupplies, deleteSupplies } = require("../controllers/suppliesController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getSuppliess);

router.route("/").post(createSupplies);

router.route("/:id").get(getSupplies);


router.route("/:id").put(updateSupplies);


router.route("/:id").delete(deleteSupplies);



module.exports = router;