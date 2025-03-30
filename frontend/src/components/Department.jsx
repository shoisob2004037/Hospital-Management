import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../App.css";

const Departments = () => {
  const [activeDepartment, setActiveDepartment] = useState(null);

  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      description: "Specialized medical care for infants, children, and adolescents, focused on developmental needs and childhood conditions.",
      specialists: 12,
      services: ["Routine check-ups", "Vaccinations", "Growth assessments", "Developmental screenings"]
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      description: "Treatment of musculoskeletal system including bones, joints, ligaments, tendons, muscles, and nerves.",
      specialists: 15,
      services: ["Joint replacement", "Sports medicine", "Fracture care", "Spine surgery"]
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      description: "Diagnosis and treatment of heart disorders, including congenital heart defects and cardiovascular disease.",
      specialists: 18,
      services: ["Echocardiograms", "Stress tests", "Cardiac catheterization", "Heart surgery"]
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      description: "Management of disorders affecting the nervous system, including the brain, spinal cord, and peripheral nerves.",
      specialists: 14,
      services: ["EEG testing", "Stroke treatment", "Headache management", "Multiple sclerosis care"]
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      description: "Specialized care for cancer diagnosis, treatment, and ongoing support throughout the cancer journey.",
      specialists: 20,
      services: ["Chemotherapy", "Radiation therapy", "Immunotherapy", "Clinical trials"]
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      description: "Diagnostic imaging services using advanced technology to visualize internal structures of the body.",
      specialists: 16,
      services: ["X-rays", "CT scans", "MRI", "Ultrasound"]
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      description: "Rehabilitation services to help patients recover mobility, strength, and function after injury or surgery.",
      specialists: 22,
      services: ["Post-surgery rehabilitation", "Sports injuries", "Chronic pain management", "Mobility training"]
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      description: "Diagnosis and treatment of skin, hair, and nail conditions, including both medical and cosmetic concerns.",
      specialists: 10,
      services: ["Skin cancer screening", "Acne treatment", "Eczema management", "Cosmetic procedures"]
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      description: "Treatment of ear, nose, and throat disorders, including hearing problems and sinus conditions.",
      specialists: 8,
      services: ["Hearing tests", "Sinus surgery", "Sleep apnea treatment", "Tonsillectomy"]
    },
  ];

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
  };

  return (
    <section className="departments-section">
      <div className="departments-container">
        <div className="departments-header">
          <h2 style={{color:'#3a539b',fontSize:'40px'}}>Our Medical Departments</h2>
          <p style={{fontSize:'20px',color:'black'}}>Click the Specialist Card to See the Details</p>
        </div>
        
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={activeDepartment === null}
          autoPlaySpeed={3500}
          keyBoardControl={true}
          customTransition="all 500ms ease"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item-padding"
          dotListClass="custom-dot-list-style"
        >
          {departmentsArray.map((depart, index) => (
            <div 
              key={index} 
              className={`department-card ${activeDepartment === index ? 'active' : ''}`}
              onClick={() => setActiveDepartment(activeDepartment === index ? null : index)}
            >
              <div className="department-image-container">
                <img src={depart.imageUrl} alt={depart.name} />
                <div className="department-overlay">
                  <div className="department-name">{depart.name}</div>
                  {activeDepartment === index && (
                    <div className="department-info">
                      <p className="department-description">{depart.description}</p>
                      <div className="department-details">
                        <div className="department-specialists">
                          <span className="detail-value">{depart.specialists}</span>
                          <span className="detail-label">Specialists</span>
                        </div>
                        <div className="department-service-count">
                          <span className="detail-value">{depart.services.length}+</span>
                          <span className="detail-label">Services</span>
                        </div>
                      </div>
                      <div className="department-services">
                        {depart.services.map((service, i) => (
                          <span key={i} className="service-tag">{service}</span>
                        ))}
                      </div>
                      <button className="department-button">Book Appointment</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Departments;