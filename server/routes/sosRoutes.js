const express = require("express");
const {
    createSos,getSosDataByUniqueCode,
    deleteSosDataByUniqueCode,
    updateSosDataByUniqueCode
} = require("../controllers/sosController");

const router = express.Router();

router.route("/")
    .post(createSos)
    
    
router.route("/:uniqueCode")
    .get(getSosDataByUniqueCode)
    .delete(deleteSosDataByUniqueCode)
    .put(updateSosDataByUniqueCode)

module.exports = router;
