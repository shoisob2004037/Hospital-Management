import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admins",
          { withCredentials: true }
        );
        setAdmins(response.data.admins);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admins");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="all-admins page">
      <h1>All Admins</h1>
      <div className="banner">
        {admins.length > 0 ? (
          <div className="admins-list">
            {admins.map((admin) => (
              <div key={admin._id} className="admin-card">
                <h3>{`${admin.firstName} ${admin.lastName}`}</h3>
                <ul className="admin-details">
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
                    <strong>Date of Birth:</strong>{" "}
                    <span>{admin.dob?.substring(0, 10)}</span>
                  </li>
                  <li>
                    <strong>Gender:</strong> <span>{admin.gender}</span>
                  </li>
                  <li>
                    <strong>Role:</strong> <span>{admin.role}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <h2>No Admins Found</h2>
        )}
      </div>
    </section>
  );
};

export default AllAdmins;