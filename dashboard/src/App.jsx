import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Doctors from "./components/Doctors.jsx";
import Messages from "./components/Messages.jsx";
import AddNewDoctor from "./components/AddNewDoctor.jsx";
import AddNewAdmin from "./components/AddNewAdmin.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main.jsx";
import "./App.css";
import axios from "axios";
import Profile from "./components/Profile.jsx";
import AllUsers from "./components/AllUsers.jsx"; 
import AllAdmins from "./components/AllAdmins.jsx"; 
import Home from "./components/Home.jsx";
import DoctorFullDetails from "./components/DoctorFullDetails.jsx";
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch(error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addNew" element={<AddNewDoctor />} />
          <Route path="/admin/addNew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/admin/me" element={<Profile />} />
          <Route path="/patients" element={<AllUsers />} /> 
          <Route path="/admins" element={<AllAdmins />} /> 
          <Route path="/doctor/full-details/:id" element={<DoctorFullDetails />} />
      
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;