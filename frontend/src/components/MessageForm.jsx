"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { User, Mail, Phone, MessageSquare, Send } from "lucide-react"

const MessageForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleMessage = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/send`,
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          },
        )
        .then((res) => {
          toast.success(res.data.message)
          setFirstName("")
          setLastName("")
          setEmail("")
          setPhone("")
          setMessage("")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <h2 className="text-2xl font-bold text-primary-800 flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-primary-600" />
            Send Us A Message
          </h2>
          <p className="mt-2 text-gray-600">We'd love to hear from you. Please fill out the form below.</p>
        </div>

        <form onSubmit={handleMessage} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
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

          <div className="relative">
            <MessageSquare className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
            <textarea
              rows="6"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-lg text-base font-medium text-dark bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageForm
