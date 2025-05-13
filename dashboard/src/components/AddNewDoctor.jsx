"use client"

import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Context } from "../main"
import axios from "axios"
import {
  UserPlus,
  Mail,
  Phone,
  Calendar,
  User,
  Lock,
  CreditCard,
  Briefcase,
  GraduationCap,
  Award,
  ImageIcon,
  FileText,
  Stethoscope,
} from "lucide-react"

const AddNewDoctor = () => {
  const { isAuthenticated } = useContext(Context)
  const navigateTo = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
    doctorEducation: "",
    doctorDegrees: "",
  })

  const [docAvatar, setDocAvatar] = useState(null)
  const [docAvatarPreview, setDocAvatarPreview] = useState("")
  const [doctorDocuments, setDoctorDocuments] = useState([])
  const [doctorDocumentsPreview, setDoctorDocumentsPreview] = useState([])
  const [loading, setLoading] = useState(false)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setDocAvatarPreview(reader.result)
      setDocAvatar(file)
    }
  }

  const handleDocuments = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const previews = []
    const fileObjects = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        previews.push(reader.result)
        fileObjects.push(file)
        if (previews.length === files.length) {
          setDoctorDocumentsPreview(previews)
          setDoctorDocuments(fileObjects)
        }
      }
    })
  }

  const handleAddNewDoctor = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key === "doctorDegrees") {
          formDataObj.append(
            key,
            formData[key].split(",").map((degree) => degree.trim()),
          )
        } else {
          formDataObj.append(key, formData[key])
        }
      })

      // Append files
      if (docAvatar) {
        formDataObj.append("docAvatar", docAvatar)
      }

      doctorDocuments.forEach((doc) => {
        formDataObj.append("doctorDocuments", doc)
      })

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/addNew`, formDataObj, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      toast.success(response.data.message)
      navigateTo("/doctors")

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
        doctorDepartment: "",
        doctorEducation: "",
        doctorDegrees: "",
      })
      setDocAvatar(null)
      setDocAvatarPreview("")
      setDoctorDocuments([])
      setDoctorDocumentsPreview([])
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-100 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <form onSubmit={handleAddNewDoctor} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <div className="md:col-span-1 flex flex-col items-center space-y-4">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-100 border-4 border-primary-100">
                <img
                  src={docAvatarPreview || "/docHolder.jpg"}
                  alt="Doctor Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/200?text=Doctor"
                  }}
                />
              </div>

              <label className="block text-sm font-medium text-gray-700">Doctor Avatar</label>

              <div className="relative w-full">
                <input type="file" onChange={handleAvatar} accept="image/*" className="sr-only" id="avatar-upload" />
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <ImageIcon className="mr-2 h-5 w-5 text-gray-400" />
                  Upload Photo
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Mail className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <Phone className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIC</label>
                  <CreditCard className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <Calendar className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <User className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <Briefcase className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <select
                    name="doctorDepartment"
                    value={formData.doctorDepartment}
                    onChange={handleChange}
                    required
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                  <GraduationCap className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                  <input
                    type="text"
                    name="doctorEducation"
                    placeholder="e.g., MBBS from XYZ University"
                    value={formData.doctorEducation}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Degrees</label>
                <Award className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <input
                  type="text"
                  name="doctorDegrees"
                  placeholder="Comma-separated, e.g., MBBS, MD"
                  value={formData.doctorDegrees}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                <FileText className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
                <div className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleDocuments}
                    accept="image/*,application/pdf"
                    className="w-full text-gray-700"
                  />
                  <p className="mt-1 text-xs text-gray-500">Upload certificates and credentials (PDF, Images)</p>
                </div>
              </div>

              {doctorDocumentsPreview.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Previews</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {doctorDocumentsPreview.map((preview, index) => (
                      <div
                        key={index}
                        className="relative h-24 w-full rounded-md overflow-hidden border border-gray-200"
                      >
                        <img
                          src={preview || "/placeholder.svg"}
                          alt={`Document ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "transform hover:scale-105"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Register New Doctor
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewDoctor
