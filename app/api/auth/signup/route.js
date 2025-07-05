import { ConnectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { otpStore } from "@/app/lib/otpStore";

const SECRET = process.env.SECRET;

export  async function POST(req){
    await ConnectDB();
    const { username , email , password} = await req.json();
    if(otpStore[email]) return NextResponse.json({message : "VERIFY OTP FAILED"} , {status : 4000} )

    console.log(username , email , password)

    const alreadyUser = await User.findOne({email})
    if(alreadyUser) {
        return NextResponse.json({message : "User Already Exist"})
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = new User({username , email , password : hashedPassword})

    await newUser.save();


    const token = jwt.sign({_id : newUser._id} , SECRET)

    const response = NextResponse.json({success : true , token})

        response.headers.set(

             "Set-Cookie",
              `token=${token}; Path=/; HttpOnly; ` 
        )

        return response;

    }

