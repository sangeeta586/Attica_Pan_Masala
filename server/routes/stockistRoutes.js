const express = require ("express");
const router = express.Router();
const {registerUser,loginUser,currentUser, getStateCity,GetAllUser,getUserDetailsByEmail, getStockistBySuperByID,updateUser,deleteUser}= require("../controllers/stockistController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");


//Register
router.post("/registerexecutive",registerUser);

//Login

router.post("/loginexecutive",loginUser);

router.post("/email",getUserDetailsByEmail)

router.put("/update/:id", updateUser)

router.delete("/:id", deleteUser)

//Current user information

router.get("/currentexecutive",executiveValidateToken,currentUser);
router.get("/getAlluser",GetAllUser)
router.get('/getStateCity/:email', getStateCity);
router.get('/superStockist/:id', getStockistBySuperByID);

module.exports =router;