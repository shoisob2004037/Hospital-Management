"use client"

import axios from "../axiosConfig"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { LogIn, Mail, Lock } from "lucide-react"

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigateTo = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        )
        .then((res) => {
          console.log("Patient Login Response:", res.data)
          console.log("Cookies after login:", document.cookie)
          toast.success(res.data.message)
          setIsAuthenticated(true)
          navigateTo("/patient/me")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        })
    } catch (error) {
      console.error("Patient Login Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      })
      toast.error(error.response.data.message)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={"/patient/me"} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8 space-y-8 transition-all duration-300 hover:shadow-card-hover">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary-800 flex items-center justify-center gap-2">
            <LogIn className="h-8 w-8 text-primary-600" />
            <span>Login</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">Login to your existing account to access all features</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
            <Lock className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm flex gap-2">
              <span className="text-gray-600">Not Registered?</span>
              <Link to={"/register"} className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                Register Now
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-dark bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
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

export default Login
