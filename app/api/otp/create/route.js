import SendOtp from "@/app/utils/sendOtp";
import { otpStore } from "@/app/lib/otpStore";
import { NextResponse } from "next/server";

export async function POST(req){

    const {email} = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore[email] = {email , otp , expiresAt};

    SendOtp({email , otp});

    return NextResponse.json({success : true})


} 
    
