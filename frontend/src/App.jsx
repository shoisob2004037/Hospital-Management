// src/App.jsx
import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Context } from './main';
import axios from './axiosConfig';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DoctorsList from './pages/DoctorsList';
import Profile from './pages/Profile';
import DoctorDetails from './pages/DoctorDetails';
import DoctorSignup from './pages/DoctorSignup';
import DoctorLogin from './pages/DoctorLogin';
import RequestToJoin from './pages/RequestToJoin';
import DoctorProfile from './pages/DoctorProfile';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, isDoctorAuthenticated, setIsDoctorAuthenticated, setDoctor } = useContext(Context);

  // Fetch Patient Authentication Status
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/me`, {
          withCredentials: true,
        });
        console.log("Patient Response:", response.data);
        if (response.data.success && response.data.user.role === "Patient") {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (error) {
        console.error("Error fetching patient:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchPatient();
  }, [setIsAuthenticated, setUser]);

  // Fetch Doctor Authentication Status
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/me`, {
          withCredentials: true,
        });
        console.log("Doctor Response:", response.data);
        if (response.data.success && response.data.user.role === "Doctor") { // Fixed: response.data.user instead of response.data.doctor
          setIsDoctorAuthenticated(true);
          setDoctor(response.data.user);
        } else {
          setIsDoctorAuthenticated(false);
          setDoctor({});
        }
      } catch (error) {
        console.error("Error fetching doctor:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        setIsDoctorAuthenticated(false);
        setDoctor({});
      }
    };
    fetchDoctor();
  }, [setIsDoctorAuthenticated, setDoctor]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient/me" element={<Profile />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/request-to-join" element={<RequestToJoin />} />
        <Route path="/doctor/me" element={<DoctorProfile />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;