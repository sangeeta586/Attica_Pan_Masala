const express = require("express");
const {
    createSosAlert,
    deleteSosAlertDataByUniqueCode,
    getSosAlertDataByUniqueCode, updateSosAlertDataByUniqueCode,
    getAllAlertSms,
    getlatestSosAlertSms
} = require("../controllers/SosAlertController");

const router = express.Router();

 
router.route("/").get(getAllAlertSms)
router.route("/latestSosAlert").get(getlatestSosAlertSms)


router.route("/:uniqueCode")
.post(createSosAlert)
.delete(deleteSosAlertDataByUniqueCode)
.get( getSosAlertDataByUniqueCode)
.put(updateSosAlertDataByUniqueCode)





module.exports = router;
