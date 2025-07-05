import { ConnectDB } from "@/app/lib/mongodb";
import Workspace from "@/app/models/Workspace";
import User from "@/app/models/User";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";
import Task from "@/app/models/Task";


export async function POST(req) {
    await ConnectDB();
    const {id} = await req.json();
    const userList = await Workspace.findById(id).populate("members")

    const userListDetail = userList.members.map((user)=>({
        userId : user._id,
        username : user.username,
        email : user.email
    }))


    return NextResponse.json({success : true , userListDetail});



}