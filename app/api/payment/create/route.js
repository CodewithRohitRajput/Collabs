import {razorpay} from '@/app/lib/razorpay'
import { NextResponse } from 'next/server'

export async function POST(req){
    const {username , email}  = await req.json();
    const subscription = await razorpay.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID,
        customer_notify : 1,
        total_count : 0,
        notes : {email , username},
    })

    return NextResponse.json({
        id : subscription.id,
        status : subscription.status
    })


}