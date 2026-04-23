const express=require('express');
const userRouter=express.Router();
const User=require("../models/user");
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest");
const USER_SAFE="firstName lastName photoUrl age gender about skills";
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
            

        }).populate("fromUserId",USER_SAFE);

        res.json({message:"data received successfully",data:connectionRequests});

    }
    catch(err){
        throw new Error("ERROR");
    }

});
userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},

            ],
        }).populate("fromUserId",USER_SAFE).populate("toUserId",USER_SAFE);
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()==loggedInUser._id){
                return row.toUserId;
            }
            return row.fromUSerId;
        });
        res.json({data});

    }
    catch(err){
        throw new Error("ERROR");
    }
});
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page)
        let limit=parseInt(req.query.limit)
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        const connectionRequests= await ConnectionRequest.find({
            $or:[
                {fromUSerId:loggedInUser._id},{toUserId:loggedInUser._id},
            ],
        }).select("fromUserId toUserId");
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
        const users=await User.find({
            $and:[{_id: {$nin:Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedInUser._id}},],
        }).select(USER_SAFE).skip(skip).limit(limit);
        res.json({data:users});

    }catch(err){
        res.status(404).json({message:err.message});
    }
})
module.exports={userRouter};