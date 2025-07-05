import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    assignedto : {
        type : mongoose.Schema.Types.ObjectId , ref : "User"

    },
    project : {
        type : mongoose.Schema.Types.ObjectId , ref : "Project"
    } , 
    status : {type : String , enum : ["Pending" , "Inprogress" , "Completed"] , default: "Pending"}
})

const  Task = mongoose.models.Task || mongoose.model("Task" , taskSchema)

export default Task;