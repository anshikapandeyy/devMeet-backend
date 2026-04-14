const express =require('express');
const authRouter=express.Router();
const {validateSignUpData} =require('../utils/validation')
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
authRouter.post("/signup",async (req,res) =>{
    
    try{
        validateSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
    const user=new User({
        firstName,lastName,emailId,password:passwordHash,
    });
        await user.save();
    res.send('user added');
    }
    catch(err){
        res.status(400).send("ERROR");
    }
    
});
authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Not Present");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            const token=await user.getJWT();
            res.cookie("token",token,{expires:new Date(Date.now()+8*36000000)});
            res.send("Login Successfully");
        }else{
            throw new Error("Login Failed");
        }

    }catch(err){
        res.status(404).send("ERROR");
    }
});
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout successfully ");
})
module.exports={authRouter};