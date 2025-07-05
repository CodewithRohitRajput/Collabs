import User from "@/app/models/User";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/app/lib/mongodb";

export async function GET(req,{params}) {
    await ConnectDB();

    // const {userId} = await params;
    
    const user = await User.findById(params.profile)
    
    const userDetails = {
        username : user.username,
        email : user.email,
        

    }

    return NextResponse.json({success : true , userDetails}  );

}