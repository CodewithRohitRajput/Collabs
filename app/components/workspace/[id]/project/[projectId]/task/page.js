'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { FiCheckCircle, FiArrowLeft, FiPlus } from "react-icons/fi"

export default function Task() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assign, setAssign] = useState('')
    const [status, setStatus] = useState('Pending')
    const [users, setUsers] = useState([])
    const { id, projectId } = useParams()

    useEffect(() => {
        async function getUserDetail() {
            try {
                const response = await fetch('/api/userDetail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id })
                })
                const data = await response.json()
                setUsers(data.userListDetail || [])
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }
        getUserDetail()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, assignedto: assign, status, projectId, id })
            })
           
                setTitle('')
                setDescription('')
                setAssign('')
                setStatus('Pending')
            
        } catch (error) {
            console.error("Error creating task:", error)
        }
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden justify-center items-center ">
            {/* Sidebar */}
            <motion.div 
                className="fixed md:relative z-40 w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col"
                initial={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold truncate">Create Task</h1>
                    <p className="text-xs text-gray-400 truncate">Project ID: {projectId}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                            Navigation
                        </h3>
                        <a 
                            href={`/components/workspace/${id}/project/${projectId}`}
                            className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                        >
                            <FiArrowLeft className="mr-2" />
                            Back to Project
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <div className="bg-gray-800/50 border-b border-gray-700 p-4">
                    <h1 className="text-2xl font-bold">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                            Create New Task
                        </span>
                    </h1>
                    <p className="text-gray-400">Add a new task to your project</p>
                </div>

                {/* Form */}
                <div>

                <div className="flex overflow-y-auto p-6 wl-20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 justify-center items-center ">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="max-w-lg mx={% raw %}{{ .Site.BaseURL }}{% endraw %}auto bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Task Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                placeholder="Enter task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                rows="4"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Assign To
                            </label>
                            <select
                                value={assign}
                                onChange={(e) => setAssign(e.target.value)}
                                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user.userId}>
                                        {`${user.username} (${user.email})`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Inprogress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        >
                            <FiPlus className="mr-2" />
                            Create Task
                        </button>
                    </motion.form>
                </div>
                </div>

            </div>
        </div>
    )
}