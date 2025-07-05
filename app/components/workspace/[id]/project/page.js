'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FiPlus, FiArrowLeft, FiCheckCircle , FiUsers } from "react-icons/fi"

export default function Workspace() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        try {
            await fetch('/api/project/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, workspaceId: id })
            })
            
            window.location.href = `/components/workspace/${id}`
        } catch (error) {
            console.error("Error creating project:", error)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => router.push(`/components/workspace/${id}`)}
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Workspace
                    </button>
                    
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                        Create New Project
                    </h1>
                    
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>

                {/* Form Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 shadow-lg"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Name Field */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                                Project Name
                            </label>
                            <div className="relative">
                                <input
                                    id="title"
                                    type="text"
                                    placeholder="Amazing Project"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Describe your project goals and vision..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Collaboration Tips */}
                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
                                <FiUsers className="mr-2" />
                                Collaboration Tips
                            </h3>
                            <ul className="text-xs text-gray-400 space-y-1">
                                <li>• Use clear, descriptive names for easy team recognition</li>
                                <li>• Add detailed descriptions to help team members understand the project</li>
                                <li>• You can invite collaborators after creation</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-medium ${
                                    isSubmitting 
                                        ? 'bg-gray-600 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30'
                                } transition-all`}
                            >
                                {isSubmitting ? (
                                    'Creating...'
                                ) : (
                                    <>
                                        <FiPlus className="mr-2" />
                                        Create Project
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Success Message (would appear after submission) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: title && description ? 1 : 0 }}
                    className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start"
                >
                    <FiCheckCircle className="text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-medium text-green-300">Ready to create!</h3>
                        <p className="text-xs text-green-400/80 mt-1">
                            Your project will be available to your team immediately after creation.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}