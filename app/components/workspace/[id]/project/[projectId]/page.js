'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { FiCopy, FiMenu, FiX, FiPlus, FiCheckCircle, FiClock, FiUsers } from "react-icons/fi"

export default function ProjectGet() {
    const [ProjectDetails, setProjectDetails] = useState({})
    const [TaskDetails, setTaskDetails] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [copiedId, setCopiedId] = useState(null)
    const { id, projectId } = useParams()

    useEffect(() => {
        async function FetchTask() {
            try {
                const response = await fetch(`/api/project/${projectId}`)
                const data = await response.json()
                setProjectDetails(data.ProjectDetails || {})
                setTaskDetails(data.TaskDetail || [])
            } catch (error) {
                console.error("Error fetching project:", error)
            }
        }
        FetchTask()
    }, [projectId])

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedId(text)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden  ">
            {/* Mobile Sidebar Toggle */}
            <button 
                className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <motion.div 
                className={`fixed md:relative z-40 w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col`}
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="p-6 border-b border-gray-700">
                    <h1 className="text-xl font-bold truncate">{ProjectDetails.title || 'Project'}</h1>
                    <p className="text-xs text-gray-400 truncate">ID: {projectId}</p>
                    <button 
                        onClick={() => copyToClipboard(projectId)}
                        className="mt-2 text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded flex items-center transition-colors"
                    >
                        <FiCopy className="mr-1" />
                        {copiedId === projectId ? 'Copied!' : 'Copy ID'}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                            Project Details
                        </h3>
                        <div className="p-3 rounded-lg bg-gray-700/50">
                            <p className="text-sm text-gray-300 line-clamp-3">{ProjectDetails.description || 'No description available'}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                                Tasks in {ProjectDetails.title || 'Project'}
                            </span>
                        </h1>
                        <p className="text-gray-400">Manage your project tasks</p>
                    </div>
                    <Link href={`${projectId}/task`} >
                    <button className="flex items-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                        <FiPlus className="mr-2" />
                        Add Task
                    </button>
                    </Link>
                </div>

                {/* Tasks Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TaskDetails.map((detail) => (
                            <motion.div
                                key={detail._id}
                                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-4">
                                            {detail.status === 'Completed' ? (
                                                <FiCheckCircle size={20} />
                                            ) : (
                                                <FiClock size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{detail.title}</h3>
                                            <p className="text-sm text-gray-400 line-clamp-2">{detail.description || 'No description'}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <FiUsers className="mr-2 text-gray-400" />
                                        <span>Assigned To :  </span>
                                        <span className="ml-2">
                                             {detail.assignedto ? `${detail.assignedto.username}` : 'Unassigned'}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            detail.status === 'Completed' 
                                                ? 'bg-green-500/20 text-green-400' 
                                                : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {detail.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <button 
                                        onClick={() => copyToClipboard(detail._id)}
                                        className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded flex items-center transition-colors"
                                    >
                                        <FiCopy className="mr-1" />
                                        {copiedId === detail._id ? 'Copied!' : 'Copy ID'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {TaskDetails.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <FiClock size={48} className="mb-4 opacity-50" />
                            <p>No tasks found in this project</p>
                            <button className="mt-4 flex items-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                                <FiPlus className="mr-2" />
                                Create Your First Task
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}