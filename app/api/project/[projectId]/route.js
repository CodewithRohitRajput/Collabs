import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";
import Task from "@/app/models/Task";

export async function GET(req,{params}){
    await ConnectDB();

    const projectId = await  params.projectId;

    const project = await Project.findById(projectId).populate("tasks")
        
    //     if (!project) {
    //     return NextResponse.json(
    //         { success: false, message: "Project not found." },
    //         { status: 404 }
    //     );
    // }

    // const TaskDetail = project.tasks.map((task)=>({
    //     _id : task.id,
    //     title : task.title,
    //     assignedto : task.assignedto,
    //     status : task.status
    // }))

//     const TaskDetail = await Promise.all(
//     project.tasks.map(async (task) => {
//         // console.log('Task:', task.title, 'AssignedTo:', task.assignedto);
//         const assignedUser = await User.findById(task.assignedto);
//         // if (!assignedUser) {
//         //     console.log('No user found for:', task.assignedto);
//         // }
//         return {
//             _id: task.id,
//             title: task.title,
//             // description : task.description,
//             assignedto: assignedUser
//                 ? {
//                     _id: assignedUser._id,
//                     username: assignedUser.username,
//                     email: assignedUser.email
//                 }
//                 : null,
//             status: task.status
//         };
//     })
// );


    const TaskDetail = await Promise.all(
    project.tasks.map(async(task)=>{
        const assignedUser = await User.findById(task.assignedto)

        return{
            _id : task.id,
            title : task.title,
            assignedto : assignedUser ? {
                _id : assignedUser._id,
                username : assignedUser.username,
                email : assignedUser.email,
                
            } : null,

            status : task.status


        }
    })
)

    // const assignedUser = await User.findById(TaskDetail.assignedto);

    // // const usernames = assignedUser.User.map((user)=>({
    // //    name : user.username
    // // }))

    // const usernames = {
    //     name : assignedUser.username
    // }

    const ProjectDetails = {
        title : project.title,
        description : project.description
    }

    // const projectTitle = project.title;
    // const projectDescription = project.description;
    console.log( "title" , TaskDetail.title);
    return NextResponse.json({success : true ,ProjectDetails, TaskDetail  })

}