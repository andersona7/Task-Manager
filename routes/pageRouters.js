const express = require("express");
const router = express.Router();
const User = require("../models/user");
const isLogged = require("../middleware/isLogged")
router.get("/",(req,res)=>{
    res.render("pages/home",{title:"Home Page"});
})

router.get("/profile",isLogged,async (req,res)=>{
    const user = await User.findById(req.session.userId);
    res.render("pages/profile",{title:"Profile"});
})



router.get("/contact",(req,res)=>{
    res.render("pages/contact",{title:"Contact us"});
})

module.exports=router;