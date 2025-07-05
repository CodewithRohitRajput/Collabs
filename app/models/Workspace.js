import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name : { type : String , 
        required : true,
        trim : true

    },
    members : [{
        type : mongoose.Schema.Types.ObjectId , ref : "User"
    }] , 
    projects : [{
        type : mongoose.Schema.Types.ObjectId , ref : "Project"
    }]
})

const  Workspace = mongoose.models.Workspace || mongoose.model("Workspace" , workspaceSchema)

export default Workspace;