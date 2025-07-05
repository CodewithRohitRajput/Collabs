import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import User from "@/app/models/User";

export async function GET(){

const SECRET = process.env.SECRET
const cookieStore = cookies();
const token = cookieStore.get("token").value;
const decoded = jwt.verify(token , SECRET)
const userId = decoded._id

return NextResponse.json({success : true , userId})


}