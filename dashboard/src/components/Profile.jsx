import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const { isAuthenticated } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setAdmin(data.user); 
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin details");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="page dashboard">
      <h1>{admin.firstName}'s Profile</h1>
      <div className="banner">
        {admin ? (
          <div className="admin-card">
            <h2>Welcome, {admin.firstName} {admin.lastName}</h2>
            <ul className="admin-details">
              <li>
                <strong>First Name:</strong> <span>{admin.firstName}</span>
              </li>
              <li>
                <strong>Last Name:</strong> <span>{admin.lastName}</span>
              </li>
              <li>
                <strong>Email:</strong> <span>{admin.email}</span>
              </li>
              <li>
                <strong>Phone:</strong> <span>{admin.phone}</span>
              </li>
              <li>
                <strong>NIC:</strong> <span>{admin.nic}</span>
              </li>
              <li>
                <strong>Date of Birth:</strong> <span>{admin.dob?.substring(0, 10)}</span>
              </li>
              <li>
                <strong>Gender:</strong> <span>{admin.gender}</span>
              </li>
              <li>
                <strong>Role:</strong> <span>{admin.role}</span>
              </li>
            </ul>
          </div>
        ) : (
          <h2>No Admin Data Available</h2>
        )}
      </div>
    </section>
  );
};

export default Profile;