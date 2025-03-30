// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [adminMe, setAdminMe] = useState([]);
  const [doctorRequests, setDoctorRequests] = useState([]); // New state for doctor requests

  const { isAuthenticated } = useContext(Context);

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  // Fetch Admin Profile
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setAdminMe(data.user);
      } catch (error) {
        setAdminMe({});
      }
    };
    fetchAdmin();
  }, []);

  // Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, []);

  // Fetch Patients
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/patients",
          { withCredentials: true }
        );
        setPatients(data.patients);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch users");
        setPatients([]);
      }
    };
    fetchUsers();
  }, []);

  // Fetch Admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/admins",
          { withCredentials: true }
        );
        setAdmins(data.admins);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admins");
        setAdmins([]);
      }
    };
    fetchAdmins();
  }, []);

  // Fetch Doctor Requests
  useEffect(() => {
    const fetchDoctorRequests = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/doctor/requests",
          { withCredentials: true }
        );
        setDoctorRequests(data.doctorRequests);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch doctor requests");
        setDoctorRequests([]);
      }
    };
    fetchDoctorRequests();
  }, []);

  // Update Appointment Status
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
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
      toast.error(error.response.data.message);
    }
  };

  // Update Doctor Request Status
  const handleUpdateDoctorRequest = async (doctorId, status) => {
    try {
      const endpoint =
        status === "approved"
          ? `http://localhost:4000/api/v1/doctor/request/approve/${doctorId}`
          : `http://localhost:4000/api/v1/doctor/request/reject/${doctorId}`;
      const { data } = await axios.put(endpoint, {}, { withCredentials: true });

      setDoctorRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== doctorId)
      ); // Remove from list after approval/rejection
      if (status === "approved") {
        setDoctors((prevDoctors) => [...prevDoctors, data.doctor]); // Add to approved doctors
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update request");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/logo.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{adminMe && `${adminMe.firstName} ${adminMe.lastName}`}</h5>
            </div>
            <p>
              This is the Admin Dashboard. View total appointments, doctors,
              users, admins, and manage doctor requests and appointment statuses.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p style={{ color: "green", fontWeight: "bold" }}>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p style={{ color: "green", fontWeight: "bold" }}>Registered Doctors</p>
          <h3>{doctors.length}</h3>
        </div>
        <div className="fourthBox">
          <p style={{ color: "green", fontWeight: "bold" }}>Total Users</p>
          <h3>{patients.length}</h3>
        </div>
        <div className="fifthBox">
          <p style={{ color: "green", fontWeight: "bold" }}>Total Admins</p>
          <h3>{admins.length}</h3>
        </div>
        <div className="sixthBox">
          <p style={{ color: "green", fontWeight: "bold" }}>Total Doctor Requests</p>
          <h3>{doctorRequests.length}</h3>
        </div>
      </div>
      <h5 style={{color:'green',textAlign:'center',fontSize:'25px'}}>Appointments</h5>
      <div className="banner">
        
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{appointment.appointment_date.substring(0, 16)}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
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
                <td colSpan="6">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <h5 style={{color:'green',textAlign:'center',fontSize:'25px'}}>Doctor Requests</h5>
      <h1 style={{fontSize:'20px',textAlign:'center'}}>Total Pending Requests : <strong style={{color:'green'}}>{doctorRequests.length}</strong></h1>
      <div className="banner">
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Education</th>
              <th>Degrees</th>
              <th>Avatar</th>
              <th>Documents</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {doctorRequests && doctorRequests.length > 0 ? (
              doctorRequests.map((request) => (
                <tr key={request._id}>
                  <td>{`${request.firstName} ${request.lastName}`}</td>
                  <td>{request.email}</td>
                  <td>{request.doctorDepartment}</td>
                  <td>{request.doctorEducation}</td>
                  <td>{request.doctorDegrees.join(", ")}</td>
                  <td>
                    {request.docAvatar?.url ? (
                      <img
                        src={request.docAvatar.url}
                        alt="Avatar"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {request.doctorDocuments.length > 0 ? (
                      request.doctorDocuments.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", margin: "5px 0" }}
                        >
                          Doc {index + 1}
                        </a>
                      ))
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <select
                      className={
                        request.requestStatus === "pending"
                          ? "value-pending"
                          : request.requestStatus === "approved"
                          ? "value-accepted"
                          : "value-rejected"
                      }
                      value={request.requestStatus}
                      onChange={(e) =>
                        handleUpdateDoctorRequest(request._id, e.target.value)
                      }
                    >
                      <option value="pending" className="value-pending">
                        Pending
                      </option>
                      <option value="approved" className="value-accepted">
                        Approved
                      </option>
                      <option value="rejected" className="value-rejected">
                        Rejected
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Doctor Requests Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;