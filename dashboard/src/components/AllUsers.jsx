import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patients`,
          { withCredentials: true }
        );
        console.log("AllUsers response:", response.data); 
        setPatients(response.data.patients || []); 
      } catch (error) {
        console.log("AllUsers error:", error.response || error); // Debug log
        toast.error(error.response?.data?.message || "Failed to fetch users");
        setPatients([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="all-users page">
      <h1>All Users</h1>
      <div className="banner">
        {patients && patients.length > 0 ? ( 
          <div className="users-list">
            {patients.map((patient) => (
              <div key={patient._id} className="user-card">
                <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
                <ul className="user-details">
                  <li>
                    <strong>Email:</strong> <span>{patient.email}</span>
                  </li>
                  <li>
                    <strong>Phone:</strong> <span>{patient.phone}</span>
                  </li>
                  <li>
                    <strong>NIC:</strong> <span>{patient.nic}</span>
                  </li>
                  <li>
                    <strong>Date of Birth:</strong>{" "}
                    <span>{patient.dob?.substring(0, 10)}</span>
                  </li>
                  <li>
                    <strong>Gender:</strong> <span>{patient.gender}</span>
                  </li>
                  <li>
                    <strong>Role:</strong> <span>{patient.role}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <h2>No Users Found</h2>
        )}
      </div>
    </section>
  );
};

export default AllUsers;