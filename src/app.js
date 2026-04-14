const express =require('express');
const connectDB=require("./config/database");
const app=express();
const {validateSignUpData} =require('./utils/validation')
const bcrypt=require('bcrypt');
const User=require('./models/user');
app.use(express.json());
const {authRouter} =require('./routes/auth');
const {profileRouter} =require('./routes/profile');
const {requestRouter} =require('./routes/requests');
const cookieParser=require('cookie-parser');
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
connectDB().then(()=>{
    console.log("db connected");
    app.listen(3000,()=>{
    console.log("server is listening");
});
}).catch((err)=>{
    console.error("Error "+err.Message);
})
