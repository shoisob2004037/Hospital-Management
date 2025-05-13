"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Users, Mail, Phone, Calendar, CreditCard, User } from "lucide-react"

const AllUsers = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patients`, {
          withCredentials: true,
        })
        setPatients(response.data.patients || [])
      } catch (error) {
        console.log("AllUsers error:", error.response || error)
        toast.error(error.response?.data?.message || "Failed to fetch users")
        setPatients([])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
      </div>

      {patients && patients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-accent-50 to-accent-100">
                <div className="flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-accent-200 flex items-center justify-center">
                    <User className="h-8 w-8 text-accent-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">{`${patient.firstName} ${patient.lastName}`}</h3>
                <p className="text-sm text-accent-600 text-center">{patient.role}</p>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{patient.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{patient.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">NIC</p>
                    <p className="text-sm text-gray-900">{patient.nic}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Date of Birth</p>
                    <p className="text-sm text-gray-900">{patient.dob?.substring(0, 10)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-accent-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Gender</p>
                    <p className="text-sm text-gray-900">{patient.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-500">There are currently no patients registered in the system.</p>
        </div>
      )}
    </div>
  )
}

export default AllUsers
