'use client'

import { useEffect, useState } from "react"

export default function Profile ({params}){
    const [profile , setProfile] = useState('')
    // const [userId , setUserId] = useState('')
    // const {id} = params;
    // setUserId(id);

    useEffect(()=>{
        const userProfile = async () =>{

            const res = await fetch(`/api/profile/${params.profile}`)
            const data = await res.json();
            setProfile(data.userDetails);
            
        }
        userProfile();

    } , [])

    return (
        <div>

        <h1>Profile</h1>

        <h3>{profile.username} </h3>
        <h3>{profile.email} </h3>

        </div>
    )

}
