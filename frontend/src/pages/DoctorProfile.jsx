"use client"

import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { Context } from "../main"
import { toast } from "react-toastify"
import { User, Mail, Phone, Calendar, CreditCard, Briefcase, GraduationCap, Award, FileText, CheckCircle, XCircle, X } from 'lucide-react'

const DoctorProfile = () => {
  const { isDoctorAuthenticated, doctor, setDoctor } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(true)

  // Fetch doctor details if not already in Context
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (doctor && doctor.role === "Doctor") {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/me`, {
          withCredentials: true,
        })
        console.log("Fetched Doctor Details:", response.data)
        if (response.data.success && response.data.user.role === "Doctor") {
          setDoctor(response.data.user)
          console.log("Doctor after setDoctor:", response.data.user)
        } else {
          throw new Error("Invalid doctor data received")
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err.message, err.response?.data)
        setError(err.response?.data?.message || "Failed to fetch doctor details")
        toast.error(err.response?.data?.message || "Failed to fetch doctor details")
      } finally {
        setLoading(false)
      }
    }

    console.log("isDoctorAuthenticated for fetchDoctorDetails:", isDoctorAuthenticated)
    if (isDoctorAuthenticated) {
      fetchDoctorDetails()
    } else {
      setLoading(false)
    }
  }, [isDoctorAuthenticated, setDoctor])

  // Fetch all appointments and filter by doctorId
  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      setAppointmentsLoading(true)
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/getall`, {
          withCredentials: true,
        })
        console.log("Logged-in Doctor ID (from Context):", doctor?._id)
        console.log("API Response Data (All Appointments):", data)
        console.log("All Appointments Array:", data.appointments)

        // Filter appointments to only include those for the logged-in doctor
        const filteredAppointments = Array.isArray(data.appointments)
          ? data.appointments.filter((appointment) => appointment.doctorId === doctor._id)
          : []
        console.log("Filtered Appointments for Doctor:", filteredAppointments)
        setAppointments(filteredAppointments)
      } catch (error) {
        console.error("Error fetching appointments:", error.response?.data)
        toast.error(error.response?.data?.message || "Failed to fetch appointments")
        setAppointments([])
      } finally {
        setAppointmentsLoading(false)
      }
    }

    // Only fetch if doctor is fully loaded
    if (isDoctorAuthenticated && doctor && doctor._id) {
      console.log("Fetching appointments for doctor:", doctor._id)
      fetchDoctorAppointments()
    } else {
      console.log("Skipping fetch: isDoctorAuthenticated or doctor not ready", {
        isDoctorAuthenticated,
        doctor,
      })
      setAppointmentsLoading(false)
    }
  }, [isDoctorAuthenticated, doctor])

  // Update appointment status
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true },
      )
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status } : appointment,
        ),
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status")
    }
  }

  // Open document in full-screen modal
  const openDocument = (docUrl) => {
    setSelectedDocument(docUrl)
  }

  // Close full-screen modal
  const closeDocument = () => {
    setSelectedDocument(null)
  }

  if (!isDoctorAuthenticated) {
    return <Navigate to="/doctor/login" />
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <XCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!doctor || doctor.role !== "Doctor") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <XCircle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor data not available</h2>
          <p className="text-gray-600">Please try logging in again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-800 sm:text-4xl">Doctor Profile</h1>
        </div>

        <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-primary-100 to-secondary-100 p-6 flex flex-col items-center justify-center">
              {doctor.docAvatar && doctor.docAvatar.url ? (
                <img
                  src={doctor.docAvatar.url || "/placeholder.svg"}
                  alt="Doctor Avatar"
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
                Dr. {doctor.firstName || ""} {doctor.lastName || ""}
              </h2>
              <p className="mt-2 text-lg font-medium text-secondary-600">
                {doctor.doctorDepartment || "Department not specified"}
              </p>
              <div className="mt-4 px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                {doctor.requestStatus || "Not Requested"}
              </div>
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
                    <p className="text-base text-gray-900">{doctor.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-base text-gray-900">{doctor.phone || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">NIC</p>
                    <p className="text-base text-gray-900">{doctor.nic || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p className="text-base text-gray-900">
                      {doctor.dob ? new Date(doctor.dob).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p className="text-base text-gray-900">{doctor.gender || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Briefcase className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-base text-gray-900">{doctor.doctorDepartment || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Education</p>
                    <p className="text-base text-gray-900">{doctor.doctorEducation || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="h-5 w-5 text-primary-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Degrees</p>
                    <p className="text-base text-gray-900">
                      {doctor.doctorDegrees && doctor.doctorDegrees.length > 0
                        ? doctor.doctorDegrees.join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {doctor.doctorDocuments && doctor.doctorDocuments.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <FileText className="h-5 w-5 text-primary-500 mr-2" />
                    Documents
                  </h4>
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
                            className="w-full h-24 object-cover"
                          />
                        ) : (
                          <div className="w-full h-24 flex items-center justify-center bg-gray-200">
                            <FileText className="h-10 w-10 text-gray-400" />
                          </div>
                        )}
                        <div className="p-2 text-center">
                          <span className="text-xs font-medium text-gray-700">Document {index + 1}</span>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                          <span className="text-white opacity-0 group-hover:opacity-100 font-medium bg-primary-600 px-3 py-1 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300">View</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-2xl font-bold text-primary-800">My Appointments</h2>
          </div>

          {appointmentsLoading ? (
            <div className="p-6 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-32 bg-primary-200 rounded mb-3"></div>
                <div className="h-4 w-24 bg-primary-200 rounded"></div>
              </div>
            </div>
          ) : Array.isArray(appointments) && appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Visited
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {`${appointment.firstName} ${appointment.lastName}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.appointment_date.substring(0, 16)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className={`text-sm rounded-full px-3 py-1 border-0 shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-all duration-300
                            ${
                              appointment.status === "Pending"
                                ? "text-yellow-700 bg-yellow-100 font-medium"
                                : appointment.status === "Accepted"
                                  ? "text-green-700 bg-green-100 font-medium"
                                  : "text-red-700 bg-red-100 font-medium"
                            }`}
                          value={appointment.status}
                          onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                        >
                          <option value="Pending" className="bg-white text-yellow-700">
                            Pending
                          </option>
                          <option value="Accepted" className="bg-white text-green-700">
                            Accepted
                          </option>
                          <option value="Rejected" className="bg-white text-red-700">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.hasVisited === true ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No Appointments Found!</p>
            </div>
          )}
        </div>
      </div>

      {/* Full-screen document modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none z-10"
              onClick={closeDocument}
            >
              <X className="h-6 w-6" />
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

export default DoctorProfile
