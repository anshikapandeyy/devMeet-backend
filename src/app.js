const express =require('express');
const connectDB=require("./config/database")
const app=express();
const User=require('./models/user');
app.use(express.json());

app.post("/signup",async (req,res) =>{
    const user=new User(req.body);
    try{
        await user.save();
    res.send('user added');
    }
    catch(err){
        res.status(400).send("error while saving user");
    }
    
});
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emialId:userEmail});
        if(users.length===0){
            res.status(404).send("not found user")
        }
        else{
            res.send(users);
        }
        
    }
    catch(err){
        res.status(404).send("not found");
    }
    
})
app.get("/feed",async (req,res)=>{
    try{
        const users=await User.find([]);
        res.send(users);
    }
    catch(err){
        res.status(404).send("not found");
    }
});
app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user =await User.findByIdAndDelete(userId);
        res.send("deleted successfully");
    }catch(err){
        res.status(404).send("not found");
    }
});
app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("added");
    }catch(err){
        res.status(404).send("something went wrong");
    }
})
connectDB().then(()=>{
    console.log("db connected");
    app.listen(3000,()=>{
    console.log("server is listening");
});
}).catch((err)=>{
    console.error("error");
})
