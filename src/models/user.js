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
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is not a valid gender type`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("not valid")
        //     }
        // }
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
userSchema.methods.getJWT=async function(){
    const user=this;
    const token =await jwt.sign({_id:user.
                _id
            },"DEV",{expiresIn:"7d"});
            return token;
}

const User=mongoose.model("User",userSchema);
module.exports=User;
