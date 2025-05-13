"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { User, ChevronRight, Stethoscope, Calendar, Award, ArrowRight } from 'lucide-react'

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`, {
          withCredentials: true,
        })
        if (data.success) {
          setDoctors(data.doctors)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors")
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  const handleSeeDetails = (doctorId) => {
    navigate(`/doctor/${doctorId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary-200 mb-3"></div>
          <div className="h-4 w-24 bg-primary-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary-800 sm:text-4xl flex items-center justify-center gap-2">
            <Stethoscope className="h-8 w-8 text-primary-600" />
            <span>Our Doctors</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Meet our team of experienced healthcare professionals
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-600">No doctors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover transform hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-r from-primary-100 to-secondary-100 flex items-center justify-center">
                  {doctor.docAvatar?.url ? (
                    <img
                      src={doctor.docAvatar.url || "/placeholder.svg"}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      className="h-36 w-36 object-cover rounded-full border-4 border-white shadow-md"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/150?text=Doctor"
                      }}
                    />
                  ) : (
                    <div className="h-36 w-36 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                      <User className="h-20 w-20 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 text-center">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-secondary-600 text-center">
                    {doctor.doctorDepartment || "General Medicine"}
                  </p>

                  <div className="mt-4 flex flex-col space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{doctor.doctorEducation || "Medical Professional"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                      <span>Available for appointments</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSeeDetails(doctor._id)}
                      className="text-green-600 hover:text-green-800 font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
                    >
                      See Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorsList
