"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { User, Mail, Phone, Calendar, CreditCard, GraduationCap, Award, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const DoctorDetails = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/${id}`, {
          withCredentials: true,
        })
        if (data.success) {
          setDoctor(data.doctor)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctor details")
      } finally {
        setLoading(false)
      }
    }
    fetchDoctorDetails()
  }, [id])

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

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
          <p className="text-gray-600 mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/doctors"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Doctors List
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/doctors" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors List
        </Link>

        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-primary-100 to-secondary-100 p-6 flex flex-col items-center justify-center">
              {doctor.docAvatar?.url ? (
                <img
                  src={doctor.docAvatar.url || "/placeholder.svg"}
                  alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                  className="h-48 w-48 object-cover rounded-full border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/200?text=Doctor"
                  }}
                />
              ) : (
                <div className="h-48 w-48 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <User className="h-24 w-24 text-gray-400" />
                </div>
              )}

              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="mt-2 text-lg font-medium text-secondary-600">
                {doctor.doctorDepartment || "General Medicine"}
              </p>
            </div>

            <div className="md:w-2/3 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Doctor Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{doctor.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-base text-gray-900">{doctor.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-base text-gray-900">{doctor.gender}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-base text-gray-900">{new Date(doctor.dob).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">NIC</p>
                    <p className="text-base text-gray-900">{doctor.nic}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Education</p>
                    <p className="text-base text-gray-900">{doctor.doctorEducation || "Not specified"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Degrees</p>
                    <p className="text-base text-gray-900">{doctor.doctorDegrees?.join(", ") || "Not specified"}</p>
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

export default DoctorDetails
