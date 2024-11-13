const express = require("express");
const router = express.Router();


const{getItems,createItem,updateItem,getItem,deleteItem}=require("../controllers/itemController")
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");

router.use(executiveValidateToken);

router.route("/").get(getItems);

router.route("/").post(createItem);

router.route("/:id").get(getItem);

router.route("/:id").put(updateItem);

router.route("/:id").delete(deleteItem);



module.exports = router;