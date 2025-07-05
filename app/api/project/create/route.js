import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";


export async function POST(req){
    await ConnectDB();
    const {title , description , workspaceId} = await req.json()
    const newProject = new Project({title , description , workspace : workspaceId  , tasks : []})
    await newProject.save();
    
    const workspace = await Workspace.findById(workspaceId)
    if(!workspace.projects.includes(newProject)){
        workspace.projects.push(newProject._id);

        await workspace.save();
    }

}

return NextResponse.json({success : true})