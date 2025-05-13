"use client"

import { useContext, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from "../main"
import { Menu, X, Home, User, UserPlus, LogIn, LogOut, Calendar, Users, ChevronDown, Stethoscope } from "lucide-react"

const Navbar = () => {
  const [show, setShow] = useState(false)
  const { isAuthenticated, setIsAuthenticated, isDoctorAuthenticated, setIsDoctorAuthenticated } = useContext(Context)
  const navigateTo = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setShow(false)
  }, [location])

  // Patient Logout
  const handlePatientLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/logout`, {
        withCredentials: true,
      })
      toast.success(res.data.message)
      setIsAuthenticated(false)
      navigateTo("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Patient logout failed")
    }
  }

  // Doctor Logout
  const handleDoctorLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/logout`, {
        withCredentials: true,
      })
      toast.success(res.data.message)
      setIsDoctorAuthenticated(false)
      navigateTo("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Doctor logout failed")
    }
  }

  // Navigate to Patient Login
  const goToPatientLogin = () => {
    navigateTo("/login")
    setShow(false)
  }

  // Navigate to Doctor Login
  const goToDoctorLogin = () => {
    navigateTo("/doctor/login")
    setShow(false)
  }

  // Navigate to Patient Signup
  const goToPatientSignup = () => {
    navigateTo("/register")
    setShow(false)
  }

  // Navigate to Doctor Signup
  const goToDoctorSignup = () => {
    navigateTo("/doctor/signup")
    setShow(false)
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-gradient-to-r from-primary-50 to-secondary-50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                <Stethoscope className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-xl font-bold text-primary-800">e-Hospital</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <Home className="h-4 w-4 inline mr-1" />
              Home
            </Link>
            <Link
              to="/doctors"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              <Users className="h-4 w-4 inline mr-1" />
              Our Doctors
            </Link>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Patient Auth */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                Patient
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                {isAuthenticated ? (
                  <div className="py-1">
                    <Link
                      to="/patient/me"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/appointment"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Book Appointment
                    </Link>
                    <button
                      onClick={handlePatientLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="py-1">
                    <button
                      onClick={goToPatientLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <LogIn className="h-4 w-4 inline mr-2" />
                      Login
                    </button>
                    <button
                      onClick={goToPatientSignup}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      Signup
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Auth */}
            <div className="relative group">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                Doctor
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                {isDoctorAuthenticated ? (
                  <div className="py-1">
                    <Link
                      to="/doctor/me"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      Doctor Profile
                    </Link>
                    <Link
                      to="/doctor/request-to-join"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      Request to Join
                    </Link>
                    <button
                      onClick={handleDoctorLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="py-1">
                    <button
                      onClick={goToDoctorLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <LogIn className="h-4 w-4 inline mr-2" />
                      Login
                    </button>
                    <button
                      onClick={goToDoctorSignup}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      Signup
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShow(!show)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {show ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${show ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
          >
            <Home className="h-4 w-4 inline mr-2" />
            Home
          </Link>
          <Link
            to="/doctors"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
          >
            <Users className="h-4 w-4 inline mr-2" />
            Our Doctors
          </Link>
        </div>

        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-2 space-y-1">
            {/* Patient Auth - Mobile */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</p>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/patient/me"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    My Profile
                  </Link>
                  <Link
                    to="/appointment"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Book Appointment
                  </Link>
                  <button
                    onClick={handlePatientLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={goToPatientLogin}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <LogIn className="h-4 w-4 inline mr-2" />
                    Login
                  </button>
                  <button
                    onClick={goToPatientSignup}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <UserPlus className="h-4 w-4 inline mr-2" />
                    Signup
                  </button>
                </>
              )}
            </div>

            {/* Doctor Auth - Mobile */}
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</p>
              {isDoctorAuthenticated ? (
                <>
                  <Link
                    to="/doctor/me"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <User className="h-4 w-4 inline mr-2" />
                    Doctor Profile
                  </Link>
                  <Link
                    to="/doctor/request-to-join"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <UserPlus className="h-4 w-4 inline mr-2" />
                    Request to Join
                  </Link>
                  <button
                    onClick={handleDoctorLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <LogOut className="h-4 w-4 inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={goToDoctorLogin}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <LogIn className="h-4 w-4 inline mr-2" />
                    Login
                  </button>
                  <button
                    onClick={goToDoctorSignup}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    <UserPlus className="h-4 w-4 inline mr-2" />
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
