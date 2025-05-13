"use client"

import { useContext, useState } from "react"
import { Context } from "../main"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../axiosConfig"
import {
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
  ImageIcon,
  UserPlus,
  Lock,
} from "lucide-react"

const RequestToJoin = () => {
  const { isAuthenticated } = useContext(Context)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")
  const [doctorEducation, setDoctorEducation] = useState("")
  const [doctorDegrees, setDoctorDegrees] = useState("")
  const [doctorDepartment, setDoctorDepartment] = useState("")
  const [doctorDocuments, setDoctorDocuments] = useState(null)
  const [docAvatar, setDocAvatar] = useState(null)

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ]

  const navigateTo = useNavigate()

  const handleRequestToJoin = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("firstName", firstName)
      formData.append("lastName", lastName)
      formData.append("email", email)
      formData.append("phone", phone)
      formData.append("nic", nic)
      formData.append("dob", dob)
      formData.append("gender", gender)
      formData.append("password", password)
      formData.append("role", "Doctor")
      formData.append("doctorEducation", doctorEducation)
      formData.append("doctorDegrees", doctorDegrees)
      formData.append("doctorDepartment", doctorDepartment)
      if (doctorDocuments) {
        for (let i = 0; i < doctorDocuments.length; i++) {
          formData.append("doctorDocuments", doctorDocuments[i])
        }
      }
      if (docAvatar) {
        formData.append("docAvatar", docAvatar)
      }

      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/request-to-join`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message)
          navigateTo("/")
          setFirstName("")
          setLastName("")
          setEmail("")
          setPhone("")
          setNic("")
          setDob("")
          setGender("")
          setPassword("")
          setDoctorEducation("")
          setDoctorDegrees("")
          setDoctorDepartment("")
          setDoctorDocuments(null)
          setDocAvatar(null)
        })
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request")
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center">
                <UserPlus className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-primary-800">REQUEST TO JOIN AS DOCTOR</h1>
            <p className="mt-2 text-gray-600">
              Complete the form below to apply as a medical professional on our platform
            </p>
          </div>

          <form onSubmit={handleRequestToJoin} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="text"
                  placeholder="First Name"
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
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Mail className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Phone className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                <CreditCard className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="number"
                  placeholder="NIC"
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
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Lock className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                <GraduationCap className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="text"
                  placeholder="Education (e.g., MBBS, MD)"
                  value={doctorEducation}
                  onChange={(e) => setDoctorEducation(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Degrees</label>
                <Award className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="text"
                  placeholder="Degrees (comma-separated, e.g., MBBS, MD)"
                  value={doctorDegrees}
                  onChange={(e) => setDoctorDegrees(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <Briefcase className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white"
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart, index) => (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                <FileText className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <div className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setDoctorDocuments(e.target.files)}
                    accept="application/pdf,image/*"
                    className="w-full text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">Upload your certificates and credentials (PDF, Images)</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <ImageIcon className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
              <div className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors">
                <input
                  type="file"
                  onChange={(e) => setDocAvatar(e.target.files[0])}
                  accept="image/*"
                  className="w-full text-gray-700"
                />
                <p className="mt-1 text-xs text-gray-500">Upload a professional profile picture (JPG, PNG)</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-dark bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RequestToJoin
