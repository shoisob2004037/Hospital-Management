import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaUserDoctor, FaUserTie, FaUsers } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa"; // Icon for doctor requests
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed!");
    }
  };

  const gotoHomePage = () => navigateTo("/");
  const gotoDashboardPage = () => navigateTo("/dashboard");
  const gotoDoctorsPage = () => navigateTo("/doctors");
  const gotoMessagesPage = () => navigateTo("/messages");
  const gotoAddNewAdmin = () => navigateTo("/admin/addnew");
  const gotoAddNewDoctor = () => navigateTo("/doctor/addnew");
  const gotoAdminsPage = () => navigateTo("/admin/me");
  const gotoAllUsersPage = () => navigateTo("/patients");
  const gotoAllAdminsPage = () => navigateTo("/admins");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </button>

      <nav className={`admin-navbar ${isSidebarOpen ? "open" : ""}`}>
        <div className="nav-container">
          <ul className="nav-links">
            <li onClick={() => { gotoHomePage(); setIsSidebarOpen(false); }}>
              <TiHome /> <span>Home</span>
            </li>
            <li onClick={() => { gotoDashboardPage(); setIsSidebarOpen(false); }}>
              <RiDashboardHorizontalFill /> <span>Dashboard</span>
            </li>
            <li onClick={() => { gotoDoctorsPage(); setIsSidebarOpen(false); }}>
              <FaUserDoctor /> <span>Doctors</span>
            </li>
            <li onClick={() => { gotoAddNewAdmin(); setIsSidebarOpen(false); }}>
              <MdAddModerator /> <span>Add New Admin</span>
            </li>
            <li onClick={() => { gotoAddNewDoctor(); setIsSidebarOpen(false); }}>
              <IoPersonAddSharp /> <span>Add New Doctor</span>
            </li>
            <li onClick={() => { gotoMessagesPage(); setIsSidebarOpen(false); }}>
              <AiFillMessage /> <span>Messages</span>
            </li>
            <li onClick={() => { gotoAllUsersPage(); setIsSidebarOpen(false); }}>
              <FaUsers /> <span>All Users</span>
            </li>
            <li onClick={() => { gotoAllAdminsPage(); setIsSidebarOpen(false); }}>
              <FaUserShield /> <span>All Admins</span>
            </li>
            <li onClick={() => { gotoAdminsPage(); setIsSidebarOpen(false); }}>
              <FaUserTie /> <span>Your Profile</span>
            </li>
            <li onClick={() => { handleLogout(); setIsSidebarOpen(false); }}>
              <RiLogoutBoxFill /> <span>Logout</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;