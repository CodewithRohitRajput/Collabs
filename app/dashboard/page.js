'use client'
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiPlus, FiUsers, FiSearch, FiMenu, FiX, FiArrowRight } from "react-icons/fi"
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa"
import Link from "next/link"

export default function Dashboard() {
    const [workspaces, setWorkspaces] = useState([])
    const [name, setName] = useState('')
    const [newWorkspaceName, setNewWorkspaceName] = useState('')
    const [joinWorkspaceCode, setJoinWorkspaceCode] = useState('')
    const [userId, setUserId] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
                                                           
    
    useEffect(() => {
        const GetDashboard = async () => {
            const response = await fetch('/api/dashboard')
            const data = await response.json()
            setWorkspaces(data.allWorkspaces)
            setName(data.userName.username)
            setUserId(data.userName._id)
        }
        GetDashboard()
        joinWorkspace()
    }, [])

    // const createWorkspace = async (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     try {
    //         const response = await fetch('/api/workspace/create', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ workspaceId: newWorkspaceName })
    //         })
    //         const data = await response.json()
    //         setWorkspaces([...workspaces, data.workspace])
    //         setNewWorkspaceName('')
    //         setIsCreateModalOpen(false)
    //     } catch (err) {
    //         console.error(err)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const joinWorkspace = async (e) => {
        // e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch('/api/workspace/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ workspaceId: joinWorkspaceCode , userId })
            })
            // const data = await response.json()
            // setWorkspaces([...workspaces, data.workspace])
            setJoinWorkspaceCode('')
            setIsJoinModalOpen(false)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
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
                className={` overflow-hidden fixed md:relative z-40 w-64 h-full bg-gray-800 border-r border-gray-700 flex flex-col`}
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                            CS
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                            CollabSpace
                        </span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                        Your Workspaces
                    </h3>
                    
                    <div className="space-y-2">
                        {workspaces.map((workspace) => (
                            <motion.div 
                                key={workspace._id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 cursor-pointer transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3">
                                    <FiUsers />
                                </div>
                                <span className="font-medium">{workspace.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                    <Link href="/components/workspace" >
                <div className="p-4 border-t border-gray-700">
                    <motion.button
                        className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        >
                        <FiPlus className="mr-2" />
                        New Workspace
                    </motion.button>
                </div>
                        </Link>


                      

            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <div className="bg-gray-800/50 border-b border-gray-700 p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                                Namaste, {name}!
                            </span>
                        </h1>
                        <p className="text-gray-400">Welcome back to your dashboard</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                            <FaDiscord />
                        </button>
                        <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                            <FaTwitter />
                        </button>
                        <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                            <FaGithub />
                        </button>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {workspaces.map((workspace) => (
                         <motion.div
                         key={workspace._id}
                        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all"
                        whileHover={{ y: -5 }}
                        >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-4">
                                        <FiUsers size={20} />
                          </div>
                         <h3 className="text-xl font-bold">{workspace.name}</h3>
                         </div>
                         <p className="text-gray-400 mb-6">Workspace description or stats could go here</p>
                         <Link href={`/components/workspace/${workspace._id}`} >
                         <button className= "text-purple-400 cursor-pointer hover:text-purple-300 font-medium flex items-center">
                                    Open Workspace <FiArrowRight className="ml-2" />
                                </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Workspace Actions */}
                    <div className="max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-6">Workspace Actions</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="joinCode" className="block text-sm font-medium text-gray-300 mb-2">
                                    Join a Workspace
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        // id="joinCode"
                                        placeholder="Enter invite code"
                                        value={joinWorkspaceCode}
                                        onChange={(e) => setJoinWorkspaceCode(e.target.value)}
                                        className="flex-1 bg-gray-700/50 border border-gray-600 rounded-l-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder-gray-500"
                                    />
                                    
                                    <button 
                                        onClick={() => setIsJoinModalOpen(true)}
                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-r-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                                    >
                                        Join
                                    </button>
                                </div>
                            </div>

                            <Link href="/components/workspace" >
                            <div className="pt-4 border-t border-gray-700">
                                <button 
                                    // onClick={() => setIsCreateModalOpen(true)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center"
                                >
                                    <FiPlus className="mr-2" />
                                    Create New Workspace
                                </button>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Workspace Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Create New Workspace</h3>
                                <button 
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={createWorkspace}>
                                <div className="mb-6">
                                    <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-300 mb-2">
                                        Workspace Name
                                    </label>
                                    <input
                                        type="text"
                                        id="workspaceName"
                                        placeholder="Enter workspace name"
                                        value={newWorkspaceName}
                                        onChange={(e) => setNewWorkspaceName(e.target.value)}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder-gray-500"
                                        required
                                    />
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <>
                                                Create
                                                <FiArrowRight className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Join Workspace Modal */}
            <AnimatePresence>
                {isJoinModalOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md p-6"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Join a Workspace</h3>
                                <button 
                                    onClick={() => setIsJoinModalOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={joinWorkspace}>
                                <div className="mb-6">
                                    <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-300 mb-2">
                                        Invite Code
                                    </label>
                                    <input
                                        type="text"
                                        id="inviteCode"
                                        placeholder="Enter invite code"
                                        value={joinWorkspaceCode}
                                        onChange={(e) => setJoinWorkspaceCode(e.target.value)}
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder-gray-500"
                                        required
                                    />
                                </div>
                                
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsJoinModalOpen(false)}
                                        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <>
                                                Join
                                                <FiArrowRight className="ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}