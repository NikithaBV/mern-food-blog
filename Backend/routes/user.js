const express = require("express");
const router = express.Router();
const{userLogin,usersignUp,getUser}=require("../controller/user");

router.post("/signUp",usersignUp)
router.post("/login",userLogin)
router.get("/user/:id",getUser)



module.exports=router