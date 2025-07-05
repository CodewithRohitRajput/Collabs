import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId , ref : "User"
    }, 
    projectid : {
        type : mongoose.Schema.Types.ObjectId , ref : "Project"
    } , 
    text : String,
    fileurl : String,
} , {timestamps : true})


 const  Message = mongoose.models.Message || mongoose.model("Message" , messageSchema)

export default Message;
