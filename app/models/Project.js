import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title : String,
    description : String,
    workspace : {
        type : mongoose.Schema.Types.ObjectId , ref : "Workspace"
    } , 
    tasks : [{
        type : mongoose.Schema.Types.ObjectId , ref : "Task"
    }],
    chatroomid : String
})

const  Project = mongoose.models.Project || mongoose.model("Project" , projectSchema)

export default Project;