import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

const SECRET = process.env.SECRET;
export  async function POST(req) {
    await ConnectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    const decoded = jwt.verify(token , SECRET)
    if(!decoded) {
        return;
    }
    const userId = decoded._id;
    const {name} = await req.json();
    const newWorkspace = new Workspace({name , members :[userId] , admin : userId , projects : []})
    await newWorkspace.save();

    await User.findByIdAndUpdate(userId , {
      $push :  {workspaces : [newWorkspace._id]}
    })

    return NextResponse.json({success : true , message : "New Workspace has been created"})

}