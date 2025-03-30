// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, isDoctorAuthenticated, setIsDoctorAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  // Patient Logout
  const handlePatientLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Patient logout failed");
    }
  };

  // Doctor Logout
  const handleDoctorLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/doctor/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsDoctorAuthenticated(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Doctor logout failed");
    }
  };

  // Navigate to Patient Login
  const goToPatientLogin = () => {
    navigateTo("/login");
    setShow(false);
  };

  // Navigate to Doctor Login
  const goToDoctorLogin = () => {
    navigateTo("/doctor/login");
    setShow(false);
  };

  // Navigate to Patient Signup
  const goToPatientSignup = () => {
    navigateTo("/register");
    setShow(false);
  };

  // Navigate to Doctor Signup
  const goToDoctorSignup = () => {
    navigateTo("/doctor/signup");
    setShow(false);
  };

  return (
    <nav className="container-fluid">
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          {/* Always Visible Links */}
          <Link to="/" onClick={() => setShow(false)}>
            Home
          </Link>
          <Link to="/doctors" onClick={() => setShow(false)}>
            Our Doctors
          </Link>

          {/* Patient-Specific Links */}
          {isAuthenticated && (
            <>
              <Link to="/appointment" onClick={() => setShow(false)}>
                Appointment
              </Link>
              <Link to="/patient/me" onClick={() => setShow(false)}>
                Patient Profile
              </Link>
            </>
          )}

          {/* Doctor-Specific Links */}
          {isDoctorAuthenticated && (
            <>
              <Link to="/doctor/request-to-join" onClick={() => setShow(false)}>
                Doctor Request to Join
              </Link>
              <Link to="/doctor/me" onClick={() => setShow(false)}>
                Doctor Profile
              </Link>
            </>
          )}
        </div>
        <div className="auth-buttons">
          {/* Patient Auth Buttons */}
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handlePatientLogout}>
              Patient Logout
            </button>
          ) : (
            <>
              <button className="loginBtn btn" onClick={goToPatientLogin}>
                Patient Login
              </button>
              <button className="signupBtn btn" onClick={goToPatientSignup}>
                Patient Signup
              </button>
            </>
          )}

          {/* Doctor Auth Buttons */}
          {isDoctorAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleDoctorLogout}>
              Doctor Logout
            </button>
          ) : (
            <>
              <button className="loginBtn btn" onClick={goToDoctorLogin}>
                Doctor Login
              </button>
              <button className="signupBtn btn" onClick={goToDoctorSignup}>
                Doctor Signup
              </button>
            </>
          )}
        </div>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        {show ? <IoMdClose /> : <GiHamburgerMenu />}
      </div>
    </nav>
  );
};

export default Navbar;