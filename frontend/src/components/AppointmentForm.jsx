"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { User, Mail, Phone, Calendar, CreditCard, MapPin, Stethoscope, UserCheck } from "lucide-react"

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [nic, setNic] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [department, setDepartment] = useState("Pediatrics")
  const [doctorFirstName, setDoctorFirstName] = useState("")
  const [doctorLastName, setDoctorLastName] = useState("")
  const [address, setAddress] = useState("")
  const [hasVisited, setHasVisited] = useState(false)

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

  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctors`, {
        withCredentials: true,
      })
      setDoctors(data.doctors)
    }
    fetchDoctors()
  }, [])
  const navigateTo = useNavigate()

  const handleAppointment = async (e) => {
    e.preventDefault()
    try {
      const hasVisitedBool = Boolean(hasVisited)
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/post`,
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      )
      toast.success(data.message)
      navigateTo("/")
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhone("")
      setNic("")
      setDob("")
      setGender("")
      setAppointmentDate("")
      setDepartment("")
      setDoctorFirstName("")
      setDoctorLastName("")
      setHasVisited("")
      setAddress("")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <h2 className="text-2xl font-bold text-primary-800 flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-primary-600" />
            Book Your Appointment
          </h2>
          <p className="mt-2 text-gray-600">
            Fill in the form below to schedule an appointment with one of our specialists
          </p>
        </div>

        <form onSubmit={handleAppointment} className="p-6 space-y-6">
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
                id="dob"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
              <Calendar className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
              <input
                type="date"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Stethoscope className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value)
                  setDoctorFirstName("")
                  setDoctorLastName("")
                }}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white"
              >
                {departmentsArray.map((depart, index) => (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <UserCheck className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
              <select
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ")
                  setDoctorFirstName(firstName)
                  setDoctorLastName(lastName)
                }}
                disabled={!department}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctor, index) => (
                    <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                      Dr. {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <MapPin className="h-5 w-5 text-gray-400 absolute top-9 left-3" />
            <textarea
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your full address"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasVisited"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="hasVisited" className="ml-2 block text-sm text-gray-700">
              Have you visited before?
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-dark bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AppointmentForm
