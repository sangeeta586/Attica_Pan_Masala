const express = require ("express");
const router = express.Router();
const {registerUser,loginUser,currentUser, getStateCity,GetAllUser}= require("../controllers/stockistController");
const executiveValidateToken = require("../middleware/executiveValidateTokenHandler");


//Register
router.post("/registerexecutive",registerUser);

//Login

router.post("/loginexecutive",loginUser);

//Current user information

router.get("/currentexecutive",executiveValidateToken,currentUser);
router.get("/getAlluser",GetAllUser)
router.get('/getStateCity/:email', getStateCity);
module.exports =router;