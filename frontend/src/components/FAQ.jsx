import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle function to show/hide answers
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I register as a patient on the Hospital Management System?",
      answer:
        "To register as a patient, click on the 'Patient Signup' button in the navigation bar or visit the '/register' page. Fill in your details such as first name, last name, email, phone, NIC, date of birth, gender, and password, then submit the form. You’ll receive a confirmation message upon successful registration.",
    },
    {
      question: "Can I book an appointment without registering?",
      answer:
        "No, you need to register and log in as a patient to book an appointment. Once logged in, navigate to the 'Appointment' page to schedule a visit with one of our doctors.",
    },
    {
      question: "How do I log in as a doctor?",
      answer:
        "If you’re a doctor, click on the 'Doctor Login' button in the navigation bar or visit '/doctor/login'. Enter your email, password, and confirm your password, then click 'Login'. You’ll be redirected to your doctor profile upon successful login.",
    },
    {
      question: "What is the 'Request to Join' feature for doctors?",
      answer:
        "The 'Request to Join' feature allows registered doctors to apply to join our hospital’s approved doctor list. After logging in, navigate to '/doctor/request-to-join', fill in your professional details (e.g., department, education, degrees, documents), and submit your request. An admin will review and approve or reject your application.",
    },
    {
      question: "How long does it take for a doctor’s request to be approved?",
      answer:
        "The approval process typically takes 3-5 business days. You’ll be notified via email once your request is reviewed by an admin. You can also check the status on your doctor profile under 'Request Status'.",
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
    {
      question: "Are my personal details secure on this platform?",
      answer:
        "Yes, we take your privacy seriously.Even we are not able to see your password because its Hashing Secured. All personal data is encrypted and stored securely. We comply with data protection regulations to ensure your information is safe.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Yes, you can cancel or reschedule your appointment by visiting the 'Appointment' page. Find your scheduled appointment, and use the options to cancel or reschedule. Note that rescheduling is subject to the doctor’s availability.",
    },
    {
      question: "What documents do doctors need to submit for the 'Request to Join'?",
      answer:
        "Doctors need to submit a profile picture (avatar) and relevant documents such as educational certificates, degrees, and any other professional credentials. These documents must be in PNG, JPEG, or PDF format.",
    },
    {
      question: "How can I contact the hospital for support?",
      answer:
        "You can reach us via email at mhshoisob@gmail.com or call us at 01850487332. Our support team is available Monday to Saturday, 9:00 AM to 3:00 PM.",
    },
    {
      question: "Is there a mobile app for the Hospital Management System?",
      answer:
        "Currently, we do not have a mobile app. However, our website is fully responsive and can be accessed on mobile devices through your browser.",
    },
  ];

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className="faq-toggle-icon">
                {activeIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;