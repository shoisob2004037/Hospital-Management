"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  // Toggle function to show/hide answers
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // FAQ data
  const faqs = [
    {
      question: "How do I register as a patient on the Hospital Management System?",
      answer:
        "To register as a patient, click on the 'Patient Signup' button in the navigation bar or visit the '/register' page. Fill in your details such as first name, last name, email, phone, NIC, date of birth, gender, and password, then submit the form. You'll receive a confirmation message upon successful registration.",
    },
    {
      question: "Can I book an appointment without registering?",
      answer:
        "No, you need to register and log in as a patient to book an appointment. Once logged in, navigate to the 'Appointment' page to schedule a visit with one of our doctors.",
    },
    {
      question: "How do I log in as a doctor?",
      answer:
        "If you're a doctor, click on the 'Doctor Login' button in the navigation bar or visit '/doctor/login'. Enter your email, password, and confirm your password, then click 'Login'. You'll be redirected to your doctor profile upon successful login.",
    },
    {
      question: "What is the 'Request to Join' feature for doctors?",
      answer:
        "The 'Request to Join' feature allows registered doctors to apply to join our hospital's approved doctor list. After logging in, navigate to '/doctor/request-to-join', fill in your professional details (e.g., department, education, degrees, documents), and submit your request. An admin will review and approve or reject your application.",
    },
    {
      question: "How long does it take for a doctor's request to be approved?",
      answer:
        "The approval process typically takes 3-5 business days. You'll be notified via email once your request is reviewed by an admin. You can also check the status on your doctor profile under 'Request Status'.",
    },
    {
      question: "Can I update my patient profile after registration?",
      answer:
        "Yes, after logging in as a patient, go to '/patient/me' to view your profile. You can update details such as your phone number, NIC, date of birth, and gender by editing your profile.",
    },
    {
      question: "How do I find a doctor for my appointment?",
      answer:
        "Visit the 'Our Doctors' page at '/doctors' to see a list of approved doctors. You can view their profiles, including their department, education, and degrees, by clicking on their name. Once you find a suitable doctor, book an appointment through the 'Appointment' page.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Currently, our system does not support password recovery directly. Please contact our support team at mhshoisob@gmail.com or call us at 01850487332 for assistance in resetting your password.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-primary-800 sm:text-4xl flex items-center justify-center gap-2">
          <HelpCircle className="h-8 w-8 text-primary-600" />
          <span>Frequently Asked Questions</span>
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
          Find answers to common questions about our healthcare services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              {activeIndex === index ? (
                <ChevronUp className="h-5 w-5 text-primary-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
