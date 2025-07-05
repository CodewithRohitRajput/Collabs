import { otpStore } from "@/app/lib/otpStore";
import { NextResponse } from "next/server";

export async function POST(req) {

    const { email , otp} = await req.json();

    const record = otpStore[email];
    if(!record) return NextResponse.json({message : "OTP not found"}  , {status : 400})
    if(record.otp != otp) return NextResponse.json({success : false , message : "OTP Invalid"})

        delete otpStore[email];

        return NextResponse.json({success : true});


}