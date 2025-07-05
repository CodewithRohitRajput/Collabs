import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    // role : {type: String , enum : ["admin" , "member"] , default : "member" },
    workspaces : [{
        type : mongoose.Schema.Types.ObjectId , ref : "Workspace"
}]

})

const  User = mongoose.models.User || mongoose.model("User" , UserSchema)

export default User;