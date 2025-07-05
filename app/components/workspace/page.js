'use client'

import { useState  } from "react"
import { useRouter } from "next/navigation"

export default function Workspace(){
    const[name , setName] = useState('');
    const router = useRouter();


    const handleSubmit = async (e)=>{
        e.preventDefault();
        await fetch('/api/workspace/create' , {
            method : 'POST', 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({name})
        })

        // router.push('/workspace')


    }


    return (
        <div>
            <h1>Create a new Workspace </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Workspace Name" value={name} onChange={(e) =>setName(e.target.value)}/>
                <button type="submit">Create</button>
            </form>
        </div>
    )

}