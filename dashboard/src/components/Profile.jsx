"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Navigate } from "react-router-dom"
import { User, Mail, Phone, Calendar, CreditCard, Shield, UserCog } from "lucide-react"

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!admin) {
    return (
      <div className="bg-white rounded-xl shadow-card p-12 text-center">
        <UserCog className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Data Not Available</h3>
        <p className="text-gray-500">Unable to load your profile information.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 p-8 flex flex-col items-center justify-center text-white">
            <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <UserCog className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold">
              {admin.firstName} {admin.lastName}
            </h2>
            <div className="mt-2 px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium">{admin.role}</div>
          </div>

          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Admin Information
            </h3>

            <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
              <div className="flex items-start">
                <User className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">First Name</p>
                  <p className="text-base text-gray-900">{admin.firstName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Name</p>
                  <p className="text-base text-gray-900">{admin.lastName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-900">{admin.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-base text-gray-900">{admin.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">NIC</p>
                  <p className="text-base text-gray-900">{admin.nic}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p className="text-base text-gray-900">{admin.dob?.substring(0, 10)}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="text-base text-gray-900">{admin.gender}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-base text-gray-900">{admin.role}</p>
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
