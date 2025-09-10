const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true}) 

// timestamps = adds createdAt & updatedAt automatically

module.exports=mongoose.model("User",userSchema)