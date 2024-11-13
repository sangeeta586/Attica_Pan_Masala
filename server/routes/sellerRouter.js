const express = require("express");
const router = express.Router();
const {   getSellers,
    getSeller,
    createSeller,
    updateSeller,
    deleteSeller } = require("../controllers/sellerController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getSellers);

router.route("/").post(createSeller);

router.route("/:id").get(getSeller);

router.route("/:id").put(updateSeller);

router.route("/:id").delete(deleteSeller);



module.exports = router;