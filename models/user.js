const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile:{
        type:String,
        default:"images/uploads/dp/defaultDP.jpg"
    },
    isVerified: {
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("User",userShema);