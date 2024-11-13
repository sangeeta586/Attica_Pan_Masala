const express = require("express");
const {uploadProduct,getAllProduct , updateProductById,deleteProductById} = require("../controllers/productEcommController");


const router  = express.Router();

router.route("/").post(uploadProduct).get(getAllProduct);
router.route("/update/:id").put(updateProductById);
router.route("/:id").delete(deleteProductById);
module.exports = router