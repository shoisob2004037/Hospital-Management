import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/me`,
          { withCredentials: true }
        );
        const user = data.user;
        setPatient(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setNic(user.nic);
        setDob(user.dob ? user.dob.substring(0, 10) : "");
        setGender(user.gender);
      } catch (error) {
        console.log("Fetch error:", error.response || error);
        toast.error(error.response?.data?.message || "Failed to fetch patient profile");
      }
    };

    const fetchPatientAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointment/patient`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.log("Fetch appointments error:", error.response || error);
        toast.error(error.response?.data?.message || "Failed to fetch appointments");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPatientProfile(), fetchPatientAppointments()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedData = { firstName, lastName, phone, nic, dob, gender };
    console.log("Sending update data:", updatedData);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/update`,
        updatedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Update response:", response);
      toast.success(response.data.message);
      setPatient({ ...patient, ...updatedData });
      setEditMode(false);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/patient/me`,
        { withCredentials: true }
      );
      setPatient(data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Update error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="page patient-profile">
      <h1>MY PROFILE</h1>
      <div className="banner">
        {patient ? (
          <div className="patient-card">
            <h2 style={{ color: "green" }}>Hey! {`${patient.firstName} ${patient.lastName}`}</h2>
            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="edit-form active">
                <ul className="patient-details">
                  <li>
                    <strong>First Name:</strong>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </li>
                  <li>
                    <strong>Last Name:</strong>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </li>
                  <li>
                    <strong>Email:</strong> <span>{patient.email}</span>
                  </li>
                  <li>
                    <strong>Phone:</strong>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </li>
                  <li>
                    <strong>NIC:</strong>
                    <input
                      type="text"
                      value={nic}
                      onChange={(e) => setNic(e.target.value)}
                    />
                  </li>
                  <li>
                    <strong>Date of Birth:</strong>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </li>
                  <li>
                    <strong>Gender:</strong>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </li>
                  <li>
                    <strong>Role:</strong> <span>{patient.role}</span>
                  </li>
                </ul>
                <div className="form-actions">
                  <button type="submit">Save Changes</button>
                  <button type="button" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <ul className="patient-details">
                <li>
                  <strong>First Name:</strong> <span>{patient.firstName}</span>
                </li>
                <li>
                  <strong>Last Name:</strong> <span>{patient.lastName}</span>
                </li>
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
                  <strong>Date of Birth:</strong> <span>{patient.dob?.substring(0, 10)}</span>
                </li>
                <li>
                  <strong>Gender:</strong> <span>{patient.gender}</span>
                </li>
                <li>
                  <strong>Role:</strong> <span>{patient.role}</span>
                </li>
                <li>
                  <button onClick={() => setEditMode(true)}>Edit Profile</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <h2>No Profile Data Available</h2>
        )}
      </div>

      {/* Display Patient's Appointments */}
      <div className="banner">
        <h2>My Appointments</h2>
        {appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                  <td>{appointment.department}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.status || "Pending"}</td>
                  <td>{appointment.hasVisited ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </section>
  );
};

export default PatientProfile;