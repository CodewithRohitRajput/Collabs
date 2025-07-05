'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FiCopy, FiFolder, FiMenu, FiX, FiPlus, FiUsers, FiSettings , FiArrowRight } from "react-icons/fi"
import Link from "next/link"

export default function SingleWorkspace() {
    const [details, setDetails] = useState([])
    const [name, setName] = useState('')
    const [workspaceID, setWorkspaceId] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [copiedId, setCopiedId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function GetWorkspace() {
            try {
                const response = await fetch(`/api/workspace/${id}`)
                const data = await response.json()
                setDetails(data.ProjectDetails || [])
                setName(data.name || 'Workspace')
                setWorkspaceId(data.workspaceId || '')
            } catch (error) {
                console.error("Error fetching workspace:", error)
            }
        }
        GetWorkspace()
    }, [id])

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedId(text)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
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
                    <h1 className="text-xl font-bold truncate">{name}</h1>
                    <p className="text-xs text-gray-400 truncate">ID: {workspaceID}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                            Projects
                        </h3>
                        <div className="space-y-2">
                            {details.map((detail) => (
                                <motion.div 
                                    key={detail._id}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                                >
                                    <p className="truncate">{detail.title}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-700">
                    <button className="w-full flex items-center justify-center py-2 px-4 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                        <FiSettings className="mr-2" />
                        Workspace Settings
                    </button>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                                Projects in {name}
                            </span>
                        </h1>
                        <p className="text-gray-400">Manage and organize your projects</p>
                    </div>
                    <Link href={`${id}/project`} >
                    <button className="flex items-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                        <FiPlus className="mr-2" />
                        New Project
                    </button>
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {details.map((project) => (
                            <motion.div
                                key={project._id}
                                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-4">
                                            <FiFolder size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{project.title}</h3>
                                            <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between mt-6">
                                    <div className="flex items-center">
                                        <button 
                                            onClick={() => copyToClipboard(project._id)}
                                            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded flex items-center transition-colors"
                                        >
                                            <FiCopy className="mr-1" />
                                            {copiedId === project._id ? 'Copied!' : 'Copy ID'}
                                        </button>
                                    </div>
                                    <Link 
                                        href={`${id}/project/${project._id}`}
                                        className="text-purple-400 hover:text-purple-300 font-medium flex items-center text-sm"
                                    >
                                        View Project <FiArrowRight className="ml-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {details.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <FiFolder size={48} className="mb-4 opacity-50" />
                            <p>No projects found in this workspace</p>
                            <button className="mt-4 flex items-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                                <FiPlus className="mr-2" />
                                Create Your First Project
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}