const express =require("express");

const router = express.Router();

const {registerUser,loginUser,getUserInfo} = require("../controllers/authController");

router.post("/register",registerUser);

router.post("/login",loginUser);    

// router.get("/getUser",protect,getUserInfo);

module.exports = router;