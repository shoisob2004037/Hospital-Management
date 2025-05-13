"use client"

import { useState } from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Users, Layers, ChevronRight } from "lucide-react"

const Department = () => {
  const [activeDepartment, setActiveDepartment] = useState(null)

  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      description:
        "Specialized medical care for infants, children, and adolescents, focused on developmental needs and childhood conditions.",
      specialists: 12,
      services: ["Routine check-ups", "Vaccinations", "Growth assessments", "Developmental screenings"],
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      description:
        "Treatment of musculoskeletal system including bones, joints, ligaments, tendons, muscles, and nerves.",
      specialists: 15,
      services: ["Joint replacement", "Sports medicine", "Fracture care", "Spine surgery"],
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      description:
        "Diagnosis and treatment of heart disorders, including congenital heart defects and cardiovascular disease.",
      specialists: 18,
      services: ["Echocardiograms", "Stress tests", "Cardiac catheterization", "Heart surgery"],
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      description:
        "Management of disorders affecting the nervous system, including the brain, spinal cord, and peripheral nerves.",
      specialists: 14,
      services: ["EEG testing", "Stroke treatment", "Headache management", "Multiple sclerosis care"],
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      description:
        "Specialized care for cancer diagnosis, treatment, and ongoing support throughout the cancer journey.",
      specialists: 20,
      services: ["Chemotherapy", "Radiation therapy", "Immunotherapy", "Clinical trials"],
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      description:
        "Diagnostic imaging services using advanced technology to visualize internal structures of the body.",
      specialists: 16,
      services: ["X-rays", "CT scans", "MRI", "Ultrasound"],
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      description:
        "Rehabilitation services to help patients recover mobility, strength, and function after injury or surgery.",
      specialists: 22,
      services: ["Post-surgery rehabilitation", "Sports injuries", "Chronic pain management", "Mobility training"],
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      description:
        "Diagnosis and treatment of skin, hair, and nail conditions, including both medical and cosmetic concerns.",
      specialists: 10,
      services: ["Skin cancer screening", "Acne treatment", "Eczema management", "Cosmetic procedures"],
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      description: "Treatment of ear, nose, and throat disorders, including hearing problems and sinus conditions.",
      specialists: 8,
      services: ["Hearing tests", "Sinus surgery", "Sleep apnea treatment", "Tonsillectomy"],
    },
  ]

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary-800 sm:text-4xl">Our Medical Departments</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">
            Click on a department card to learn more about our specialized services
          </p>
        </div>

        <div className="mt-10">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={activeDepartment === null}
            autoPlaySpeed={3500}
            keyBoardControl={true}
            customTransition="all 500ms ease"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
            dotListClass="custom-dot-list-style"
          >
            {departmentsArray.map((depart, index) => (
              <div
                key={index}
                className={`mx-2 cursor-pointer rounded-xl overflow-hidden shadow-card transition-all duration-300 transform ${
                  activeDepartment === index
                    ? "scale-105 shadow-card-hover ring-2 ring-primary-500"
                    : "hover:shadow-card-hover hover:-translate-y-1"
                }`}
                onClick={() => setActiveDepartment(activeDepartment === index ? null : index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={depart.imageUrl || "/placeholder.svg"}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "/placeholder.svg?height=300&width=400"
                    }}
                    alt={depart.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/70 to-transparent transition-opacity duration-300 ${
                      activeDepartment === index ? "opacity-90" : "opacity-70"
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-2">{depart.name}</h3>

                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          activeDepartment === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-white/90 text-sm mb-4">{depart.description}</p>

                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-secondary-300 mr-1" />
                            <span className="text-white font-semibold">{depart.specialists}</span>
                            <span className="text-white/80 text-xs ml-1">Specialists</span>
                          </div>
                          <div className="flex items-center">
                            <Layers className="h-4 w-4 text-secondary-300 mr-1" />
                            <span className="text-white font-semibold">{depart.services.length}+</span>
                            <span className="text-white/80 text-xs ml-1">Services</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {depart.services.map((service, i) => (
                            <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>

                        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-900 bg-secondary-400 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors">
                          Book Appointment
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default Department
