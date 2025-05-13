"use client"

import { useContext, useEffect, useState } from "react"
import { useParams, Navigate, Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from "../main"
import {
  Stethoscope,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  User,
  GraduationCap,
  Award,
  ArrowLeft,
  FileText,
} from "lucide-react"

const DoctorFullDetails = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useContext(Context)
  const [selectedDocument, setSelectedDocument] = useState(null)

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

  const openDocument = (url) => {
    setSelectedDocument(url)
  }

  const closeDocument = () => {
    setSelectedDocument(null)
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

  if (!doctor) {
    return (
      <div className="bg-white rounded-xl shadow-card p-12 text-center">
        <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Doctor Not Found</h3>
        <p className="text-gray-500 mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/doctors"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors List
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Details</h1>
        <Link
          to="/doctors"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Doctors List
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-primary-600 to-primary-700 p-6 flex flex-col items-center justify-center text-white">
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
              <div className="h-48 w-48 rounded-full bg-primary-200 flex items-center justify-center border-4 border-white shadow-md">
                <User className="h-24 w-24 text-primary-600" />
              </div>
            )}
            <h2 className="mt-6 text-2xl font-bold">
              Dr. {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="mt-2 text-lg font-medium text-primary-100">
              {doctor.doctorDepartment || "Department not specified"}
            </p>
          </div>

          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Doctor Information
            </h3>

            <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
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

      {/* Documents Section */}
      {doctor.doctorDocuments && doctor.doctorDocuments.length > 0 && (
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 text-primary-500 mr-2" />
              Submitted Documents
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {doctor.doctorDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => openDocument(doc.url)}
                >
                  {doc.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                    <img
                      src={doc.url || "/placeholder.svg"}
                      alt={`Document ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://via.placeholder.com/150?text=Document"
                      }}
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-gray-200">
                      <FileText className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  <div className="p-2 text-center">
                    <span className="text-xs font-medium text-gray-700">Document {index + 1}</span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-medium bg-primary-600 px-3 py-1 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none z-10"
              onClick={closeDocument}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedDocument.match(/\.(jpeg|jpg|png|gif)$/i) ? (
              <img
                src={selectedDocument || "/placeholder.svg"}
                alt="Full-screen document"
                className="max-w-full h-auto mx-auto"
              />
            ) : (
              <iframe src={selectedDocument} title="Full-screen document" className="w-full h-screen" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorFullDetails
