"use client"

import { Clock, UserCheck, UserPlus, LayoutDashboard } from "lucide-react"

const Hero = ({ title, subtitle, icon }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <div className="flex items-center mb-4">
            {icon}
            <h1 className="text-3xl font-extrabold text-primary-800 sm:text-4xl ml-3">{title}</h1>
          </div>
          <p className="mt-3 text-xl text-gray-600 max-w-3xl">
            {subtitle ||
              "e-HOSPITAL is an online appointment booking facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Booking</h3>
            <p className="text-gray-600">Schedule appointments anytime, anywhere</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Doctor Appointment</h3>
            <p className="text-gray-600">Patients can book doctor appointments</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mb-4">
              <UserPlus className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Doctor Login</h3>
            <p className="text-gray-600">Doctors can request to join our platform</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <LayoutDashboard className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
            <p className="text-gray-600">Manage doctors, patients and appointments</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
