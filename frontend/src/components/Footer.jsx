"use client"

import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Clock, ChevronRight, Heart } from "lucide-react"

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Sunday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Monday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Tuesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Wednesday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Thursday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary-900 to-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <ChevronRight className="h-5 w-5 text-primary-300 mr-2" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li className="transition-transform duration-200 hover:translate-x-1">
                <Link to="/" className="flex items-center hover:text-primary-300">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-1">
                <Link to="/appointment" className="flex items-center hover:text-primary-300">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Appointment
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-1">
                <Link to="/doctors" className="flex items-center hover:text-primary-300">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Our Doctors
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-1">
                <Link to="/login" className="flex items-center hover:text-primary-300">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </li>
              <li className="transition-transform duration-200 hover:translate-x-1">
                <Link to="/register" className="flex items-center hover:text-primary-300">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Clock className="h-5 w-5 text-primary-300 mr-2" />
              Available Schedule
            </h3>
            <ul className="space-y-2">
              {hours.map((element) => (
                <li key={element.id} className="flex justify-between items-center">
                  <span className="font-medium">{element.day}</span>
                  <span className="text-primary-200">{element.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Mail className="h-5 w-5 text-primary-300 mr-2" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-300 mr-3 mt-0.5" />
                <span>01850487332</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-300 mr-3 mt-0.5" />
                <span>mhshoisob@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-300 mr-3 mt-0.5" />
                <span>Rajshahi, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by e-Hospital Team &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
