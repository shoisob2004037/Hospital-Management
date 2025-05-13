"use client"

import axios from "axios"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { UserPlus, Mail, Phone, Calendar, User, Lock, CreditCard } from "lucide-react"

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")

  const navigateTo = useNavigate()

  const handleRegistration = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/register`,
          { firstName, lastName, email, phone, nic, dob, gender, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        )
        .then((res) => {
          toast.success(res.data.message)
          setIsAuthenticated(true)
          navigateTo("/")
          setFirstName("")
          setLastName("")
          setEmail("")
          setPhone("")
          setNic("")
          setDob("")
          setGender("")
          setPassword("")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-card p-8 space-y-8 transition-all duration-300 hover:shadow-card-hover">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-800 flex items-center justify-center gap-2">
            <UserPlus className="h-8 w-8 text-primary-600" />
            <span>Sign Up</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">Please sign up to continue and access our healthcare services</p>
        </div>

        <form onSubmit={handleRegistration} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div className="relative">
              <User className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="relative">
              <User className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div className="relative">
              <Mail className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="relative">
              <Phone className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div className="relative">
              <CreditCard className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="number"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="relative">
              <Calendar className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
            <div className="relative">
              <User className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
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
              <Lock className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm flex gap-2">
              <span className="text-gray-600">Already Registered?</span>
              <Link to={"/signin"} className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Login Now
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
              </span>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
