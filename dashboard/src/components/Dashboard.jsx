"use client"

import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { CheckCircle, XCircle, Users, Stethoscope, Calendar, UserCog, ClipboardList } from "lucide-react"

const Dashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [admins, setAdmins] = useState([])
  const [adminMe, setAdminMe] = useState([])
  const [doctorRequests, setDoctorRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const { isAuthenticated } = useContext(Context)

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true)
      try {
        const [appointmentsRes, doctorsRes, patientsRes, adminsRes, adminMeRes, doctorRequestsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/getall`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patients`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admins`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/me`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/requests`, { withCredentials: true }),
        ])

        setAppointments(appointmentsRes.data.appointments || [])
        setDoctors(doctorsRes.data.doctors || [])
        setPatients(patientsRes.data.patients || [])
        setAdmins(adminsRes.data.admins || [])
        setAdminMe(adminMeRes.data.user || {})
        setDoctorRequests(doctorRequestsRes.data.doctorRequests || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast.error("Failed to load some dashboard data")
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchAllData()
    }
  }, [isAuthenticated])

  // Update Appointment Status
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
      toast.error(error.response.data.message)
    }
  }

  // Update Doctor Request Status
  const handleUpdateDoctorRequest = async (doctorId, status) => {
    try {
      const endpoint =
        status === "approved"
          ? `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/request/approve/${doctorId}`
          : `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/request/reject/${doctorId}`
      const { data } = await axios.put(endpoint, {}, { withCredentials: true })

      setDoctorRequests((prevRequests) => prevRequests.filter((request) => request._id !== doctorId))
      if (status === "approved") {
        setDoctors((prevDoctors) => [...prevDoctors, data.doctor])
      }
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update request")
    }
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-primary-600 to-primary-700 p-6 flex flex-col items-center justify-center text-white">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-24 w-24 object-contain mb-4"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/100?text=Logo"
              }}
            />
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="mb-4">
              <p className="text-gray-500">Hello,</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {adminMe && `${adminMe.firstName || ""} ${adminMe.lastName || ""}`}
              </h2>
            </div>
            <p className="text-gray-600">
              Welcome to the Admin Dashboard. Here you can view and manage appointments, doctors, users, and more. Use
              the navigation menu to access different sections.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              <h3 className="text-2xl font-bold text-primary-600">{appointments.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Registered Doctors</p>
              <h3 className="text-2xl font-bold text-secondary-600">{doctors.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-accent-600">{patients.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <UserCog className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Admins</p>
              <h3 className="text-2xl font-bold text-blue-600">{admins.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Doctor Requests</p>
              <h3 className="text-2xl font-bold text-purple-600">{doctorRequests.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
          <h2 className="text-xl font-bold text-primary-800">Appointments</h2>
        </div>
        <div className="p-6 overflow-x-auto">
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
                  Doctor
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
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`${appointment.firstName} ${appointment.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.appointment_date.substring(0, 16)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`${appointment.doctor?.firstName || ""} ${appointment.doctor?.lastName || ""}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`text-sm rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-offset-2 ${
                          appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 focus:ring-yellow-500"
                            : appointment.status === "Accepted"
                              ? "bg-green-100 text-green-800 focus:ring-green-500"
                              : "bg-red-100 text-red-800 focus:ring-red-500"
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
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {appointment.hasVisited === true ? (
                        <CheckCircle className="h-5 w-5 text-green-500 inline" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 inline" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No Appointments Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Requests Section */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100">
          <h2 className="text-xl font-bold text-primary-800">Doctor Requests</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total Pending Requests: <span className="font-semibold text-primary-600">{doctorRequests.length}</span>
          </p>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
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
                  Education
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Degrees
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Avatar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Documents
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctorRequests && doctorRequests.length > 0 ? (
                doctorRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`${request.firstName} ${request.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.doctorDepartment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.doctorEducation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.doctorDegrees?.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.docAvatar?.url ? (
                        <img
                          src={request.docAvatar.url || "/placeholder.svg"}
                          alt="Avatar"
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://via.placeholder.com/40?text=Dr"
                          }}
                        />
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.doctorDocuments && request.doctorDocuments.length > 0 ? (
                        <div className="flex flex-col space-y-1">
                          {request.doctorDocuments.map((doc, index) => (
                            <a
                              key={index}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary-600 hover:text-primary-800 transition-colors"
                            >
                              Document {index + 1}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`text-sm rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-offset-2 ${
                          request.requestStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800 focus:ring-yellow-500"
                            : request.requestStatus === "approved"
                              ? "bg-green-100 text-green-800 focus:ring-green-500"
                              : "bg-red-100 text-red-800 focus:ring-red-500"
                        }`}
                        value={request.requestStatus}
                        onChange={(e) => handleUpdateDoctorRequest(request._id, e.target.value)}
                      >
                        <option value="pending" className="bg-white text-yellow-700">
                          Pending
                        </option>
                        <option value="approved" className="bg-white text-green-700">
                          Approved
                        </option>
                        <option value="rejected" className="bg-white text-red-700">
                          Rejected
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No Doctor Requests Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
