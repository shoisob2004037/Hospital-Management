"use client"

import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { MessageSquare, User, Mail, Phone, MessageCircle } from "lucide-react"

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useContext(Context)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message/getall`, {
          withCredentials: true,
        })
        setMessages(data.messages || [])
      } catch (error) {
        console.log(error.response?.data?.message || "Failed to fetch messages")
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Messages from Users</h2>
              <p className="text-sm text-gray-600">
                Total Messages Received: <span className="font-semibold text-purple-600">{messages.length}</span>
              </p>
            </div>
          </div>
        </div>

        {messages && messages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div key={message._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="mb-4 md:mb-0 md:mr-6 md:flex-1">
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {message.firstName} {message.lastName}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 mb-3">
                      <div className="flex items-start mb-1">
                        <MessageCircle className="h-4 w-4 text-purple-500 mt-0.5 mr-2" />
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 text-sm text-gray-600 md:w-64 md:flex-shrink-0">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-purple-500 mr-2" />
                      <span>{message.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-purple-500 mr-2" />
                      <span>{message.phone}</span>
                    </div>
                    {message.createdAt && (
                      <div className="text-xs text-gray-500 mt-2">
                        Sent on: {new Date(message.createdAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages</h3>
            <p className="text-gray-500">There are currently no messages in the system.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messages
