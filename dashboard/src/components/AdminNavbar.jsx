"use client"

import { useContext, useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { Context } from "../main"
import axios from "axios"
import { toast } from "react-toastify"
import {
  Home,
  LogOut,
  MessageSquare,
  Stethoscope,
  UserCog,
  LayoutDashboard,
  UserPlus,
  Users,
  Shield,
  User,
  Menu,
  X,
} from "lucide-react"

const AdminNavbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context)
  const navigateTo = useNavigate()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin/logout`, {
        withCredentials: true,
      })
      toast.success(res.data.message)
      setIsAuthenticated(false)
      navigateTo("/")
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!")
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  if (!isAuthenticated) return null

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/doctors", label: "Doctors", icon: <Stethoscope className="w-5 h-5" /> },
    { path: "/admin/addnew", label: "Add New Admin", icon: <UserCog className="w-5 h-5" /> },
    { path: "/doctor/addnew", label: "Add New Doctor", icon: <UserPlus className="w-5 h-5" /> },
    { path: "/messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { path: "/patients", label: "All Users", icon: <Users className="w-5 h-5" /> },
    { path: "/admins", label: "All Admins", icon: <Shield className="w-5 h-5" /> },
    { path: "/admin/me", label: "Your Profile", icon: <User className="w-5 h-5" /> },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md text-primary-600"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary-600"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 mt-6 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </aside>
    </>
  )
}

export default AdminNavbar
