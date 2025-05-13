"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Navigate } from "react-router-dom"
import { User, Mail, Phone, Calendar, CreditCard, Shield, UserCog, Edit } from "lucide-react"

const Profile = () => {
  const [admin, setAdmin] = useState(null)
  const { isAuthenticated } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/me`, {
          withCredentials: true,
        })
        setAdmin(data.user)
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin details")
      } finally {
        setLoading(false)
      }
    }
    fetchAdmin()
  }, [])

  if (!isAuthenticated) {
    return <Navigate to={"/"} />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!admin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <UserCog className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Admin Data Not Available</h3>
          <p className="text-gray-500 mb-6">Unable to load your profile information.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <UserCog className="h-8 w-8 text-blue-600 mr-3" />
              Admin Profile
            </h1>
            <p className="mt-2 text-gray-600">View and manage your account information</p>
          </div>
          
          <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="md:flex">
            {/* Profile Sidebar */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-500"></div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center mb-4 border-4 border-white/30">
                    {admin.avatar?.url ? (
                      <img
                        src={admin.avatar.url}
                        alt={`${admin.firstName} ${admin.lastName}`}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <UserCog className="h-16 w-16 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2 shadow-md">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-center">
                  {admin.firstName} {admin.lastName}
                </h2>
                <div className="mt-2 px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-300 mr-2 animate-pulse"></span>
                  {admin.role}
                </div>
                
                <div className="mt-6 w-full">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Account Status</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Verified</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="md:w-2/3 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-3">
                  <UserCog className="h-5 w-5 text-blue-600" />
                </span>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <User className="h-4 w-4 text-blue-500 mr-2" />
                    Personal Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-400">First Name</p>
                      <p className="text-sm font-medium text-gray-800">{admin.firstName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Last Name</p>
                      <p className="text-sm font-medium text-gray-800">{admin.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Gender</p>
                      <p className="text-sm font-medium text-gray-800 capitalize">{admin.gender}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Date of Birth</p>
                      <p className="text-sm font-medium text-gray-800">
                        {admin.dob ? new Date(admin.dob).toLocaleDateString() : 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <Mail className="h-4 w-4 text-blue-500 mr-2" />
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-800 truncate">{admin.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{admin.phone || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Identification */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <CreditCard className="h-4 w-4 text-blue-500 mr-2" />
                    Identification
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-400">NIC Number</p>
                      <p className="text-sm font-medium text-gray-800">{admin.nic || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <Shield className="h-4 w-4 text-blue-500 mr-2" />
                    Account Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-400">Role</p>
                      <p className="text-sm font-medium text-gray-800">{admin.role}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Account Created</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
