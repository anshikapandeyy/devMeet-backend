const express =require('express');
const app=express();
app.use((req,res)=>{
    res.send("hello gautam");
})
app.listen(3000);