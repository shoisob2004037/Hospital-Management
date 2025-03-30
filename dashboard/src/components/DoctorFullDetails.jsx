import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import "./DoctorFullDetails.css";

const DoctorFullDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(Context); // Use Context for auth

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/user/doctor/${id}`,
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

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <div className="doctor-details-loading">Loading doctor details...</div>;
  }

  if (!doctor) {
    return <div className="doctor-details-not-found">Doctor not found.</div>;
  }

  return (
    <section className="doctor-details-page">
      <h1 className="doctor-details-title">Doctor Full Details</h1>
      <div className="doctor-details-card">
        <img
          src={doctor.docAvatar?.url || "/default-doctor.png"}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="doctor-details-avatar"
          onError={(e) => (e.target.src = "/default-doctor.png")}
        />
        <div className="doctor-details-info">
          <h2 className="doctor-details-name">{`${doctor.firstName} ${doctor.lastName}`}</h2>
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
            <strong>Date of Birth:</strong> {new Date(doctor.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>NIC:</strong> {doctor.nic}
          </p>
          <p>
            <strong>Education:</strong> {doctor.doctorEducation}
          </p>
          <p>
            <strong>Degrees:</strong> {doctor.doctorDegrees?.join(", ") || "N/A"}
          </p>
          <div className="doctor-details-documents">
            <h3>Submitted Documents</h3>
            {doctor.doctorDocuments && doctor.doctorDocuments.length > 0 ? (
              <div className="doctor-details-documents-grid">
                {doctor.doctorDocuments.map((doc, index) => (
                  <img
                    key={index}
                    src={doc.url}
                    alt={`Document ${index + 1}`}
                    className="doctor-details-document-img"
                    onError={(e) => (e.target.src = "/default-document.png")}
                  />
                ))}
              </div>
            ) : (
              <p>No documents submitted.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorFullDetails;