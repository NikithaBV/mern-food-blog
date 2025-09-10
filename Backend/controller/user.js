const User=require("../models/user")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const usersignUp=async(req,res)=>{
    const{email,password}=req.body
    
    //if email and password is emplty
    if(!email || !password){
        return res.status(400).json({error:"Email and password is required"})
    }

    //if eneterd registerd email
    let user= await User.findOne({email})
    if(user){
        return res.status(400).json({error:"Email already exists!"})
    }

    //store in db email as it is and password is hassed form
    const hashPwd = await bcrypt.hash(password,10)
    const newUser = await User.create({
        email,
        password:hashPwd
    })


    //generate token
    let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({token,user:newUser})
}


const userLogin=async(req,res)=>{
    const{email,password}=req.body
    
    //if email and password is emplty
    if(!email || !password){
        return res.status(400).json({error:"Email and password is required"})
    }
    let user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    } else {
        return res.status(400).json({error:"Invalid credientials"})
    }
}

const getUser=async(req,res)=>{
    const user = await User.findById(req.params.id)
    res.json({email:user.email})
}

module.exports={usersignUp,userLogin,getUser}