"use client"

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from "../main"
import { LogIn, Mail, Lock } from "lucide-react"

const DoctorLogin = () => {
  const { setIsDoctorAuthenticated, setDoctor } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/login`,
        { email, password, confirmPassword, role: "Doctor" },
        { withCredentials: true },
      )
      toast.success(res.data.message)
      setIsDoctorAuthenticated(true)
      setDoctor(res.data.user)
      navigate("/doctor/me")
    } catch (err) {
      console.error("Login error:", err.response?.data)
      toast.error(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8 space-y-8 transition-all duration-300 hover:shadow-card-hover">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-800 flex items-center justify-center gap-2">
            <LogIn className="h-8 w-8 text-primary-600" />
            <span>Doctor Login</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">Login to your doctor account to manage appointments and patients</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="relative">
            <Mail className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <p className="text-gray-600">
                Not registered?{" "}
                <Link
                  to="/doctor/signup"
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                >
                  Signup here
                </Link>
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
              </span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DoctorLogin
