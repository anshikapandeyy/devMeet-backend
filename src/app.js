const express =require('express');
const connectDB=require("./config/database");
const app=express();
const User=require('./models/user');
app.use(express.json());
const {validateSignUpData} =require('./utils/validation')
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const {userAuth}=require("./middlewares/auth")
app.post("/signup",async (req,res) =>{
    
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
app.post("/login",async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Not Present");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            const token=await user.getJWT();
            res.cookie("token",token,{expires:new Data(Date.now()+8*36000000)});
            res.send("Login Successfully");
        }else{
            throw new Error("Login Failed");
        }

    }catch(err){
        res.status(404).send("ERROR");
    }
})
app.get("/profile",userAuth,async (req,res)=>{
    try{
    const user=req.user;
    res.send(user);
}
    catch(err){
        res.status(404).send("ERROR");
    }
    
})
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    const user=req.user;
    console.log("sendind connection request");
    res.send(user.firstName+"sent the connection request");

});
// app.get("/user",async (req,res)=>{
//     const userEmail=req.body.emailId;
//     try{
//         const users=await User.find({emailId:userEmail});
//         if(users.length===0){
//             res.status(404).send("Not found")
//         }
//         else{
//             res.send(users);
//         }
        
//     }
//     catch(err){
//         res.status(404).send("Not found");
//     }
    
// })
// app.get("/feed",async (req,res)=>{
//     try{
//         const users=await User.find([]);
//         res.send(users);
//     }
//     catch(err){
//         res.status(404).send("not found");
//     }
// });
// app.delete("/user",async (req,res)=>{
//     const userId=req.body.userId;
//     try{
//         const user =await User.findByIdAndDelete(userId);
//         res.send("deleted successfully");
//     }catch(err){
//         res.status(404).send("not found");
//     }
// });
// app.patch("/user/:userId",async (req,res)=>{
//     const userId=req.params?.userId;
//     const data=req.body;
    
//     try{
//         const ALLOWED_UPDATES=[
//         "photoUrl","about","gender","age","skills"
//     ];
//     const isUpdateAllowed =Object.keys(data).every(k=> ALLOWED_UPDATES.includes(k));
//     if(!isUpdateAllowed){
//         throw new Error("Update not allowed");
//     }
//     if(data?.skills.length>10){
//         throw new Error("only ten skills allowed");
//     }
//         const user =await User.findByIdAndUpdate({_id:userId},data,{
//         returnDocument:"after",
//         runValidators:true,
//         });
//         console.log(user);
        
//         res.send("added");
//     }catch(err){
//         res.status(404).send("Update Failed"+err.message);
//     }
// })
connectDB().then(()=>{
    console.log("db connected");
    app.listen(3000,()=>{
    console.log("server is listening");
});
}).catch((err)=>{
    console.error("Error");
})
