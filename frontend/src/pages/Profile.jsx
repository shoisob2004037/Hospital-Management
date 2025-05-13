"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Navigate } from "react-router-dom"
import { User, Mail, Phone, Calendar, CreditCard, Edit2, Save, X, CheckCircle, XCircle } from 'lucide-react'

const PatientProfile = () => {
  const [patient, setPatient] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const { isAuthenticated } = useContext(Context)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/me`, {
          withCredentials: true,
        })
        const user = data.user
        setPatient(user)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setPhone(user.phone)
        setNic(user.nic)
        setDob(user.dob ? user.dob.substring(0, 10) : "")
        setGender(user.gender)
      } catch (error) {
        console.log("Fetch error:", error.response || error)
        toast.error(error.response?.data?.message || "Failed to fetch patient profile")
      }
    }

    const fetchPatientAppointments = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/patient`, {
          withCredentials: true,
        })
        setAppointments(data.appointments)
      } catch (error) {
        console.log("Fetch appointments error:", error.response || error)
        toast.error(error.response?.data?.message || "Failed to fetch appointments")
      }
    }

    const fetchData = async () => {
      setLoading(true)
      await Promise.all([fetchPatientProfile(), fetchPatientAppointments()])
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const updatedData = { firstName, lastName, phone, nic, dob, gender }
    console.log("Sending update data:", updatedData)
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/update`,
        updatedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      )
      console.log("Update response:", response)
      toast.success(response.data.message)
      setPatient({ ...patient, ...updatedData })
      setEditMode(false)
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/me`, {
        withCredentials: true,
      })
      setPatient(data.user)
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log("Update error:", error.response || error)
      toast.error(error.response?.data?.message || "Failed to update profile")
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-800 sm:text-4xl">My Profile</h1>
        </div>

        {patient ? (
          <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
              <h2 className="text-2xl font-bold text-primary-800 flex items-center">
                <User className="mr-2 h-6 w-6 text-primary-600" />
                Hey! {`${patient.firstName} ${patient.lastName}`}
              </h2>
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="relative sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Mail className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="email"
                      value={patient.email}
                      disabled
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Phone className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                    <CreditCard className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="text"
                      value={nic}
                      onChange={(e) => setNic(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <Calendar className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="relative sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                    <input
                      type="text"
                      value={patient.role}
                      disabled
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-center sm:justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300"
                  >
                    <X className="mr-2 h-5 w-5 text-gray-500" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-5 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <User className="mr-2 h-4 w-4 text-primary-500" />
                      First Name
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.firstName}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <User className="mr-2 h-4 w-4 text-primary-500" />
                      Last Name
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.lastName}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-primary-500" />
                      Email
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.email}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-primary-500" />
                      Phone
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.phone}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-primary-500" />
                      NIC
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.nic}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-primary-500" />
                      Date of Birth
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.dob?.substring(0, 10)}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <User className="mr-2 h-4 w-4 text-primary-500" />
                      Gender
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.gender}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <User className="mr-2 h-4 w-4 text-primary-500" />
                      Role
                    </dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900">{patient.role}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex justify-center sm:justify-end">
                  <button
                    onClick={() => setEditMode(true)}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-dark bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <Edit2 className="mr-2 h-5 w-5" />
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-card p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800">No Profile Data Available</h2>
          </div>
        )}

        {/* Appointments Section */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-2xl font-bold text-primary-800">My Appointments</h2>
          </div>

          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                      Doctor
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
                        {new Date(appointment.appointment_date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            appointment.status === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {appointment.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.hasVisited ? (
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
              <p>No appointments found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientProfile
