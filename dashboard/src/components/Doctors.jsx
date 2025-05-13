"use client"

import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { Stethoscope, Mail, Phone, Calendar, CreditCard, User, Trash2, Info } from "lucide-react"

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`, {
          withCredentials: true,
        })
        setDoctors(data.doctors || [])
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchDoctors()
    }
  }, [isAuthenticated])

  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return

    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/${doctorId}`, {
        withCredentials: true,
      })
      toast.success(data.message)
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId))
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete doctor!")
    }
  }

  const handleViewDetails = (doctorId) => {
    navigate(`/doctor/full-details/${doctorId}`)
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
      </div>

      {doctors && doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100 flex items-center">
                <div className="mr-4">
                  <div className="h-16 w-16 rounded-full bg-white overflow-hidden">
                    <img
                      src={doctor.docAvatar?.url || "/default-doctor.png"}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/100?text=Dr"
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h3>
                  <p className="text-sm text-primary-600">{doctor.doctorDepartment}</p>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{doctor.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{doctor.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Date of Birth</p>
                    <p className="text-sm text-gray-900">{doctor.dob?.substring(0, 10)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">NIC</p>
                    <p className="text-sm text-gray-900">{doctor.nic}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-xs font-medium text-gray-500">Gender</p>
                    <p className="text-sm text-gray-900">{doctor.gender}</p>
                  </div>
                </div>
              </div>

              {user && user.role === "Admin" && (
                <div className="px-6 py-4 bg-gray-50 flex justify-between">
                  <button
                    onClick={() => handleDeleteDoctor(doctor._id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>

                  <button
                    onClick={() => handleViewDetails(doctor._id)}
                    className=" flex items-center justify-center px-4 py-2 border border-primary-500 rounded-md shadow-sm text-sm font-medium text-primary-600 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 group"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    Details
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-card p-12 text-center">
          <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Registered Doctors Found!</h3>
          <p className="text-gray-500">There are currently no doctors registered in the system.</p>
        </div>
      )}
    </div>
  )
}

export default Doctors
