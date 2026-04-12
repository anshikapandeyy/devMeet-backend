const validator=require('validator');
const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Invalid Name");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password need to be strong");
    }
}
module.exports={validateSignUpData};