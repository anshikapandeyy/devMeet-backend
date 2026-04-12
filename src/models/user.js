const mongoose=require('mongoose');
const validator =require("validator"); 
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
        maxLength:50,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:13,
    },
    gender:{

        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default: "https://hostalitecloud.com/crb/wp-content/uploads/2025/10/dummy-user-male.jpg",
        runValidators:true,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid")
            }
        }
    },
    about:{
        type:String,
    },
    skills:{
        type:[String],
    }
},{timestamps:true,});
const User=mongoose.model("User",userSchema);
module.exports=User;
