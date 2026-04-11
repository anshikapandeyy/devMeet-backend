const mongoose=require('mongoose');

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://anshipandey6565_db_user:uGDSGjReZAHZnZyB@cluster0.knnpblp.mongodb.net/devMeet"

    );
};
module.exports=connectDB;
