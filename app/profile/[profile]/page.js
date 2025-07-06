'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiUser, FiMail, FiUpload, FiArrowLeft } from "react-icons/fi"
import Link from "next/link"

export default function Profile({ params }) {
    const [profile, setProfile] = useState({})
    const [pic, setPic] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const userProfile = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/profile/${params.profile}`)
            const data = await res.json()
            setProfile(data.userDetails)
        } catch (error) {
            console.error("Failed to fetch profile:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        userProfile()
    }, [])

    const fileChanger = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPic(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!pic) return
        
        setIsLoading(true)
        try {
            const res = await fetch('/api/userProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ base64: pic })
            })
            const data = await res.json()
            if (data.success) {
                setUploadSuccess(true)
                await userProfile()
                setTimeout(() => setUploadSuccess(false), 3000)
            }
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Back Navigation */}
            <div className="bg-gray-800/50 border-b border-gray-700 p-4">
                <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-white transition-colors">
                    <FiArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-8"
                >
                    <h1 className="text-3xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                            Profile Settings
                        </span>
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center md:items-start space-y-6">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
                                    {profile.profilepic ? (
                                        <img 
                                            src={profile.profilepic} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                            <FiUser className="text-gray-500 text-5xl" />
                                        </div>
                                    )}
                                </div>
                                
                                <motion.label 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-full cursor-pointer shadow-lg hover:shadow-purple-500/30 transition-all"
                                >
                                    <FiUpload className="text-white" />
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={fileChanger} 
                                    />
                                </motion.label>
                            </div>

                            {pic && (
                                <motion.button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                                        isLoading ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/30'
                                    } transition-all`}
                                    whileHover={{ scale: isLoading ? 1 : 1.03 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Uploading...
                                        </>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </motion.button>
                            )}

                            {uploadSuccess && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-400 text-sm"
                                >
                                    Profile picture updated successfully!
                                </motion.div>
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="flex-1 space-y-6">
                            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <FiUser className="text-purple-400 mr-2" />
                                    User Information
                                </h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Username
                                        </label>
                                        <div className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3">
                                            {profile.username || 'Not set'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Email
                                        </label>
                                        <div className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3">
                                            {profile.email || 'Not set'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <FiMail className="text-purple-400 mr-2" />
                                    Account Details
                                </h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            Member Since
                                        </label>
                                        <div className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3">
                                            {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Unknown'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">
                                            User ID
                                        </label>
                                        <div className="bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-xs font-mono text-gray-300 overflow-x-auto">
                                            {profile.id || 'Unknown'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}