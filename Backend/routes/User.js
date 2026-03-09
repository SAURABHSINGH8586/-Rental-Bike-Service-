const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth");
const {login,signUp,getProfile}=require('../controller/auth');



router.post("/login", login);
router.post("/signup", signUp);
router.get("/signup",getProfile);

module.exports = router

