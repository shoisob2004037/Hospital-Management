import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import "./Doctors.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/user/doctor/${doctorId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete doctor!");
    }
  };

  const handleViewDetails = (doctorId) => {
    console.log("Navigating to:", `/doctor/full-details/${doctorId}`); // Debug log
    navigate(`/doctor/full-details/${doctorId}`);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="doctors-page">
      <h1 className="doctors-title">DOCTORS</h1>
      <div className="doctors-banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="doctors-card" key={element._id}>
                <img
                  src={element.docAvatar?.url || "/default-doctor.png"}
                  alt="doctor avatar"
                  className="doctors-avatar"
                  onError={(e) => (e.target.src = "/default-doctor.png")}
                />
                <h4 className="doctors-name">{`${element.firstName} ${element.lastName}`}</h4>
                <div className="doctors-details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
                {user && user.role === "Admin" && (
                  <div className="doctors-actions">
                    <button
                      className="doctors-delete-btn"
                      onClick={() => handleDeleteDoctor(element._id)}
                    >
                      Delete this Doctor
                    </button>
                    <button
                      className="doctors-details-btn"
                      onClick={() => handleViewDetails(element._id)}
                    >
                      Details
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <h1 className="doctors-no-found">No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;