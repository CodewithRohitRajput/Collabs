import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export  async function POST(req) {
    // add user id in workspace
    await ConnectDB();
    const{workspaceId , userId} = await req.json();
    console.log("See" , workspaceId , userId)
    const workspace = await Workspace.findByIdAndUpdate(workspaceId , {
        $push : {members : userId}
    } , {new : true})

    await User.findByIdAndUpdate(userId , {
        $push :{workspaces : workspaceId} 
        
    } , {new : true})

    // if(!workspace) return NextResponse.json({successs : false, message : "Workspace not found"})
    //     if(!workspace.members.includes(userId)){
    //         workspace.members.push(userId)
    //         // await addnewUser.save();
    //     }

    // // adding workspaceid in user

    // const workinuser = await User.findById(userId)
    //     if(!workinuser.workspaces.includes(userId)){
    //         workinuser.workspaces.push(userId)
    //         // await newWorkspace.save();
    //     }

    return NextResponse.json({success : true})

}