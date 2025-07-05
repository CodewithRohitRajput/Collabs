'use client'

import { useState , useEffect } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"

export default function Task(){
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [assign , setAssign] = useState('');
    const [status , setStatus] = useState('');
    const[userName , setUserName] = useState([])
    const[userEmail , serUserEmail] = useState([])

    const { id , projectId} = useParams();
    
    useEffect(()=>{
      async  function getuserDetail(){

            const response = await fetch('api/userDetail' , {
                method : 'POST',
                headers : {

                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({id})
            })
            const data = await response.json();
            setUserName(data.userListDetail.username)
            setUserEmail(data.userListDetail.email)
            
        }   

        getuserDetail();

    } , [])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await fetch(`/api/task/create` ,{
            method : 'POST' , 
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({title , description , assign , status , projectId , id})
        })

        return (
            <div>
                <h1>Create Task here</h1>

                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />

                    <input type="text" placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)} />
{/* 
                    <input type="text" placeholder="assigning to" value={assign} onChange={(e)=>setAssign(e.target.value)} /> */}

                    

                            <select>
                                <option>
                            Select User
                                </option>
                                {userName.map((keyvalue)=>(
                                      <option key={keyvalue._id} >
                                        {keyvalue}
                                </option>
                                ))}
                              
                            </select>

                        



                    <input type="text" placeholder="set status" value={title} onChange={(e)=>setTitle(e.target.value)} />

                    <button type="submit" >Create</button>

                </form>

            </div>
        )

    }



}
