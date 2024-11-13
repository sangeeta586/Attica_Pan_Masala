const express = require("express");
const router = express.Router();


const{  getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier}=require("../controllers/supplierController")
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getSuppliers);

router.route("/").post(createSupplier);

router.route("/:id").get(getSupplierById);

router.route("/:id").put(updateSupplier);

router.route("/:id").delete(deleteSupplier);



module.exports = router;