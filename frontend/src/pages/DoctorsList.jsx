import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        if (data.success) {
          setDoctors(data.doctors);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch doctors"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSeeDetails = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  if (loading) {
    return <div className="loading">Loading doctors...</div>;
  }

  return (
    <div className="container doctors-list">
      <h2>Our Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <img
                src={doctor.docAvatar?.url || "/default-doctor.png"}
                alt={`${doctor.firstName} ${doctor.lastName}`}
                className="doctor-avatar"
                onError={(e) => (e.target.src = "/default-doctor.png")}
              />
              <div className="doctor-info">
                <h3>
                  {doctor.firstName} {doctor.lastName}
                </h3>
                <p style={{ color: "green", fontSize: "20px", textAlign: "center" }}>
                  <strong>{doctor.doctorDepartment}</strong>
                </p>
                <button
                  className="see-details-btn"
                  onClick={() => handleSeeDetails(doctor._id)}
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;