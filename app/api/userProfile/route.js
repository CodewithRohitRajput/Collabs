import User from "@/app/models/User";
import { ConnectDB } from "@/app/lib/mongodb";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    await ConnectDB();
    const {base64} = await req.json();
    const SECRET = process.env.SECRET

    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value;
    const decoded = jwt.verify(token , SECRET);

    const userId = decoded._id;

    const user = await User.findByIdAndUpdate(userId , {
        profilepic : base64
    } , {new : true})

    return NextResponse.json({success : true})

}

