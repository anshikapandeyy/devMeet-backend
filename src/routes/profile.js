const express =require('express');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const {validEditProfileData}=require("../utils/validation");
profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
    const user=req.user;
    res.send(user);
}
    catch(err){
        res.status(404).send("ERROR");
    }
    
})
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateProfileEditData(req)){
            throw new Error("ERROR:Invalid request");
        };
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key]=req.body[key];
        });
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName},your profile is updated successfully`);

    }
    catch(err){
        res.status(404).send("ERROR");
    }
    
})
module.exports={profileRouter};