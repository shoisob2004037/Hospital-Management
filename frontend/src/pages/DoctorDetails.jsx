import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/doctor/${id}`, // Updated endpoint
          { withCredentials: true }
        );
        if (data.success) {
          setDoctor(data.doctor);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch doctor details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading doctor details...</div>;
  }

  if (!doctor) {
    return <div className="not-found">Doctor not found.</div>;
  }

  return (
    <div className="container doctor-details">
      <h2>Doctor Details</h2>
      <div className="details-card">
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
          <p>
            <strong>Department:</strong> {doctor.doctorDepartment}
          </p>
          <p>
            <strong>Email:</strong> {doctor.email}
          </p>
          <p>
            <strong>Phone:</strong> {doctor.phone}
          </p>
          <p>
            <strong>Gender:</strong> {doctor.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(doctor.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>NIC:</strong> {doctor.nic}
          </p>
          <p>
            <strong>Education:</strong> {doctor.doctorEducation}
          </p>
          <p>
            <strong>Degrees:</strong>{" "}
            {doctor.doctorDegrees?.join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;