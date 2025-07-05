import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";
import Task from "@/app/models/Task";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET

export async function GET(){

    await ConnectDB();
    
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = jwt.verify(token , SECRET);
    
    const user = await User.findById(decoded._id).populate("workspaces")

    const userName = {
        _id : user._id,
       username : user.username
    }

    
    const allWorkspaces = user.workspaces.map((data)=>({
        _id : data._id,
        name : data.name || "unnamed"
    }))
    
    return NextResponse.json({ success : true , allWorkspaces , userName })
}