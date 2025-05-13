"use client";

import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ChevronRight, Heart } from "lucide-react";

const Footer = () => {
  const hours = [
    { id: 1, day: "Sunday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Monday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Tuesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Wednesday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Thursday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="bg-gradient-to-r from-primary-50 to-secondary-50 text-slate-800">
      {/* Wave shape divider */}
      <div className="w-full h-16 bg-gradient-to-r from-primary-50 to-secondary-50 transform -translate-y-1">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-current text-primary-800"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-current text-primary-800"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current text-primary-800"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center mr-3">
                <Heart className="h-5 w-5 text-primary-200" />
              </div>
              <span className="text-xl font-bold text-white">e-Hospital</span>
            </div>
            <p className="text-primary-200">
              Providing exceptional healthcare services with compassion and cutting-edge technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-black-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-black-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center border-b border-primary-600 pb-2">
              <ChevronRight className="h-5 w-5 text-primary-300 mr-2" />
              <span className="text-white">Quick Links</span>
            </h3>
            <ul className="space-y-3">
              <li className="transition-all duration-200 hover:translate-x-1 hover:text-primary-300">
                <Link to="/" className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-primary-300" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="transition-all duration-200 hover:translate-x-1 hover:text-primary-300">
                <Link to="/appointment" className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-primary-300" />
                  <span>Appointment</span>
                </Link>
              </li>
              <li className="transition-all duration-200 hover:translate-x-1 hover:text-primary-300">
                <Link to="/doctors" className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-primary-300" />
                  <span>Our Doctors</span>
                </Link>
              </li>
              <li className="transition-all duration-200 hover:translate-x-1 hover:text-primary-300">
                <Link to="/login" className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-primary-300" />
                  <span>Login</span>
                </Link>
              </li>
              <li className="transition-all duration-200 hover:translate-x-1 hover:text-primary-300">
                <Link to="/register" className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2 text-primary-300" />
                  <span>Register</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours Column */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center border-b border-primary-600 pb-2">
              <Clock className="h-5 w-5 text-primary-300 mr-2" />
              <span className="text-white">Opening Hours</span>
            </h3>
            <ul className="space-y-3">
              {hours.map((element) => (
                <li key={element.id} className="flex justify-between items-center">
                  <span className="font-medium text-primary-200">{element.day}</span>
                  <span className="text-white bg-primary-700 px-2 py-1 rounded text-sm">
                    {element.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-5 flex items-center border-b border-primary-600 pb-2">
              <Mail className="h-5 w-5 text-primary-300 mr-2" />
              <span className="text-white">Contact Us</span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-primary-300" />
                </div>
                <div className="ml-3">
                  <p className="text-primary-200">Phone</p>
                  <p className="text-dark">01850487332</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-primary-300" />
                </div>
                <div className="ml-3">
                  <p className="text-primary-200">Email</p>
                  <p className="text-dark">mhshoisob@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-primary-300" />
                </div>
                <div className="ml-3">
                  <p className="text-primary-200">Address</p>
                  <p className="text-dark">Rajshahi, Bangladesh</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-primary-700 text-center">
          <p className="flex items-center justify-center text-primary-300">
            Made  by Shaisob
            <span className="mx-2">•</span>
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
