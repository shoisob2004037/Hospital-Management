// src/components/DoctorProfile.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../main";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const DoctorProfile = () => {
  const { isDoctorAuthenticated, doctor, setDoctor } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  // Fetch doctor details if not already in Context
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (doctor && doctor.role === "Doctor") {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/me`, {
          withCredentials: true,
        });
        console.log("Fetched Doctor Details:", response.data);
        if (response.data.success && response.data.user.role === "Doctor") {
          setDoctor(response.data.user);
          console.log("Doctor after setDoctor:", response.data.user);
        } else {
          throw new Error("Invalid doctor data received");
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err.message, err.response?.data);
        setError(err.response?.data?.message || "Failed to fetch doctor details");
        toast.error(err.response?.data?.message || "Failed to fetch doctor details");
      } finally {
        setLoading(false);
      }
    };

    console.log("isDoctorAuthenticated for fetchDoctorDetails:", isDoctorAuthenticated);
    if (isDoctorAuthenticated) {
      fetchDoctorDetails();
    } else {
      setLoading(false);
    }
  }, [isDoctorAuthenticated, setDoctor]);

  // Fetch all appointments and filter by doctorId
  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      setAppointmentsLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/getall`, {
          withCredentials: true,
        });
        console.log("Logged-in Doctor ID (from Context):", doctor?._id);
        console.log("API Response Data (All Appointments):", data);
        console.log("All Appointments Array:", data.appointments);

        // Filter appointments to only include those for the logged-in doctor
        const filteredAppointments = Array.isArray(data.appointments)
          ? data.appointments.filter(
              (appointment) => appointment.doctorId === doctor._id
            )
          : [];
        console.log("Filtered Appointments for Doctor:", filteredAppointments);
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error.response?.data);
        toast.error(error.response?.data?.message || "Failed to fetch appointments");
        setAppointments([]);
      } finally {
        setAppointmentsLoading(false);
      }
    };

    // Only fetch if doctor is fully loaded
    if (isDoctorAuthenticated && doctor && doctor._id) {
      console.log("Fetching appointments for doctor:", doctor._id);
      fetchDoctorAppointments();
    } else {
      console.log("Skipping fetch: isDoctorAuthenticated or doctor not ready", {
        isDoctorAuthenticated,
        doctor,
      });
      setAppointmentsLoading(false);
    }
  }, [isDoctorAuthenticated, doctor]);

  // Log appointments state whenever it changes
  useEffect(() => {
    console.log("Appointments State Changed:", appointments);
  }, [appointments]);

  // Update appointment status
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // Open document in full-screen modal
  const openDocument = (docUrl) => {
    setSelectedDocument(docUrl);
  };

  // Close full-screen modal
  const closeDocument = () => {
    setSelectedDocument(null);
  };

  if (!isDoctorAuthenticated) {
    return <Navigate to="/doctor/login" />;
  }

  if (loading) {
    return <div className="loading-spinner">Loading doctor profile...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!doctor || doctor.role !== "Doctor") {
    return <div className="error-message">Doctor data not available</div>;
  }

  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-card">
        <h2>Doctor Profile</h2>
        {doctor.docAvatar && doctor.docAvatar.url ? (
          <img
            src={doctor.docAvatar.url}
            alt="Doctor Avatar"
            className="doctor-avatar"
          />
        ) : (
          <div className="doctor-avatar-placeholder">No Avatar</div>
        )}
        <div className="doctor-details">
          <div className="detail-row">
            <span className="detail-label">First Name:</span>
            <span className="detail-value">{doctor.firstName || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Last Name:</span>
            <span className="detail-value">{doctor.lastName || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{doctor.email || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{doctor.phone || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">NIC:</span>
            <span className="detail-value">{doctor.nic || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date of Birth:</span>
            <span className="detail-value">
              {doctor.dob ? new Date(doctor.dob).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">{doctor.gender || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Department:</span>
            <span className="detail-value">{doctor.doctorDepartment || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Education:</span>
            <span className="detail-value">{doctor.doctorEducation || "N/A"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Degrees:</span>
            <span className="detail-value">
              {doctor.doctorDegrees && doctor.doctorDegrees.length > 0
                ? doctor.doctorDegrees.join(", ")
                : "N/A"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Request Status:</span>
            <span className="detail-value">{doctor.requestStatus || "Not Requested"}</span>
          </div>
          {doctor.doctorDocuments && doctor.doctorDocuments.length > 0 && (
            <div className="detail-row">
              <span className="detail-label">Documents:</span>
              <div className="documents-list">
                {doctor.doctorDocuments.map((doc, index) => (
                  <div key={index} className="document-item">
                    {doc.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                      <img
                        src={doc.url}
                        alt={`Document ${index + 1}`}
                        className="document-preview"
                        onClick={() => openDocument(doc.url)}
                      />
                    ) : (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="document-link"
                        onClick={(e) => {
                          e.preventDefault();
                          openDocument(doc.url);
                        }}
                      >
                        Document {index + 1} (View)
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="appointments-banner">
      <h5 className="appointments-title">My Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {console.log("Rendering Appointments:", appointments)}
            {appointmentsLoading ? (
              <tr>
                <td colSpan="5">Loading appointments...</td>
              </tr>
            ) : Array.isArray(appointments) && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{appointment.appointment_date.substring(0, 16)}</td>
                  <td>{appointment.department}</td>
                  <td>
                    <select
                      className={
                        appointment.status === "Pending"
                          ? "value-pending"
                          : appointment.status === "Accepted"
                          ? "value-accepted"
                          : "value-rejected"
                      }
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending" className="value-pending">
                        Pending
                      </option>
                      <option value="Accepted" className="value-accepted">
                        Accepted
                      </option>
                      <option value="Rejected" className="value-rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                  <td>
                    {appointment.hasVisited === true ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Full-screen document modal */}
      {selectedDocument && (
        <div className="document-modal">
          <div className="document-modal-content">
            <button className="document-modal-close" onClick={closeDocument}>
              ×
            </button>
            {selectedDocument.match(/\.(jpeg|jpg|png|gif)$/i) ? (
              <img
                src={selectedDocument}
                alt="Full-screen document"
                className="document-fullscreen"
              />
            ) : (
              <iframe
                src={selectedDocument}
                title="Full-screen document"
                className="document-fullscreen"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;