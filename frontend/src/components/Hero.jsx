import React from "react";

const Hero = ({ title }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            e-HOSPITAL is a online appointment booking facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs.
          </p>
        </div>
        <div className="banner">
          <div className="feature-cards">
            <div className="card">
              <h3>24/7 Booking</h3>
              <p>Schedule appointments anytime, anywhere</p>
            </div>
            <div className="card">
              <h3>Doctor Appointment</h3>
              <p>Patient can book Doctor Appointment</p>
            </div>
            <div className="card">
              <h3>Doctor Login</h3>
              <p>Doctor can join request to Admin.</p>
            </div>
            <div className="card">
              <h3>Admin Dashboard</h3>
              <p>Admin can manage all doctors, patients and Appointments.</p>
            </div>
            <div className="card">
              <h3>Contact Request</h3>
              <p>Contact or Message through our Message Options.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;