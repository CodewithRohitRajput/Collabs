import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export  async function GET(req,{params}) {
    await ConnectDB();
    const workspaceId = await params.id;
    const workspace = await Workspace.findById(workspaceId).populate("projects");
    
   const ProjectDetails = workspace.projects.map((project)=>({
    _id : project._id,
     title : project.title,
     description : project.description,
   }))
    
    return NextResponse.json({success : true ,ProjectDetails , workspaceId , name : workspace.name })
    
    
    
}