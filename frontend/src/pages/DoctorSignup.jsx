"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { UserPlus, Mail, Phone, Calendar, User, Lock, CreditCard } from "lucide-react"

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/register`, formData, {
        withCredentials: true,
      })
      toast.success(res.data.message)
      navigate("/doctor/login")
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8 space-y-8 transition-all duration-300 hover:shadow-card-hover">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-800 flex items-center justify-center gap-2">
            <UserPlus className="h-8 w-8 text-primary-600" />
            <span>Doctor Signup</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">Join our healthcare platform as a medical professional</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div className="relative">
              <User className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="relative">
              <User className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="relative">
            <Phone className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="relative">
            <CreditCard className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              name="nic"
              placeholder="NIC"
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="relative">
            <Calendar className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              name="dob"
              type="date"
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="relative">
            <User className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <select
              name="gender"
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
            <Lock className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoctorSignup
