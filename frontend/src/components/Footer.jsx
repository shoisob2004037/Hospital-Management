import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="quick-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/appointment">Appointment</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Available Schedule</h3>
          <ul className="schedule-list">
            {hours.map((element) => (
              <li key={element.id} className="schedule-item">
                <span className="schedule-day">{element.day}</span>
                <span className="schedule-time">{element.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <span className="contact-text">01850487332</span>
          </div>
          <div className="contact-item">
            <MdEmail className="contact-icon" />
            <span className="contact-text">mhshoisob@gmail.com</span>
          </div>
          <div className="contact-item">
            <FaLocationArrow className="contact-icon" />
            <span className="contact-text">Rajshahi, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;