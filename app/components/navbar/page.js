'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Navbar(){

    const [userid , setUserid] = useState('')

    useEffect(()=>{

        
        const fetchId = async () =>{
            const res = await fetch('/api/profile')
            const data = await res.json();
            setUserid(data.userId)
        }
        fetchId()
        
    } , [])
    return(
        <div className="  top-0 " >
            <ul className="flex justify-between px-20  h-12 items-center font-bold text-purple-600 text-xl cursor-pointer bg-gray-950  " >
               
                <li className="hover:scale-105 transition-all duration-100" >

            <Link href={`/profile/${userid}`} >
            My Profile
            </Link>
                </li>

        <Link href="/" >
        <li className="hover:scale-105 hover:text-purple-500 transition-all duration-100" >
            Home
        </li>
        </Link>
        <Link href="/dashboard" >
        <li className="hover:scale-105 hover:text-purple-500 transition-all duration-100">
            Dashboard
        </li>
        </Link>
        <li className="hover:scale-105 hover:text-purple-500 transition-all duration-100">
            About us
        </li>
        <li className="hover:scale-105 hover:text-purple-500 transition-all duration-100">
            Contact us
        </li>
        <li className="hover:scale-105 hover:text-purple-500 transition-all duration-100">
            Support
        </li>

            </ul>
            <div className="h-2 bg-gray-900" ></div>
        </div>
    )


}