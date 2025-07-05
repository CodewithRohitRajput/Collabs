import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";
import Task from "@/app/models/Task";
import mongoose from "mongoose";
import { sendEmail } from "@/app/utils/sendEmail";

export async function POST(req){
    await ConnectDB();
    const {title , description ,  assignedto : assign  , status , projectId , id} = await req.json();

    const newTask = new Task({title , description , assignedto : new mongoose.Types.ObjectId(assign) , project : new mongoose.Types.ObjectId(projectId) , status  }) ;
    await newTask.save();

    // saving task id in project
    await Project.findByIdAndUpdate(projectId , {
        $push : { tasks : newTask._id}
        
    },
    {new  : true}
)

    const useremail = await User.findById(assign)
    const usermail = {
                   email : useremail.email
    }
    
    
    await sendEmail({
        to: usermail.email,
        title : title,
        description  : description
    })
    
    return NextResponse.json({success : true})

}