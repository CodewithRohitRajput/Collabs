import { ConnectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET = process.env.SECRET

export  async function POST(req){
    await ConnectDB();
    const{email , password} = await req.json();
    console.log(email , password)
    
    const isUser = await User.findOne({email})
    if(!isUser) return NextResponse.json({message : "User not found" })

        const isValid = await bcrypt.compare(password , isUser.password);

        if(!isValid) return NextResponse.json({
            message : "Password is wrong"
        })

        const token = jwt.sign({_id : isUser._id} , SECRET)



     const response =   NextResponse.json({success : true , message : "User loggedIn" , token})

     response.headers.set(
        'Set-Cookie',
        `token=${token}; Path=/; HttpOnly; `
     )

     return response;

}