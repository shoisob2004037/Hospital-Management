"use client"

import Hero from "../components/Hero"
import AppointmentForm from "../components/AppointmentForm"
import { Calendar } from "lucide-react"

const Appointment = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Hero
        title="Schedule Your Appointment"
        subtitle="Book a consultation with our experienced healthcare professionals"
        icon={<Calendar className="h-12 w-12 text-primary-600" />}
      />
      <AppointmentForm />
    </div>
  )
}

export default Appointment
