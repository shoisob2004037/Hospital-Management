// src/pages/RequestToJoin.jsx
import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../axiosConfig"; // Use the configured Axios instance

const RequestToJoin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorEducation, setDoctorEducation] = useState("");
  const [doctorDegrees, setDoctorDegrees] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [doctorDocuments, setDoctorDocuments] = useState(null);
  const [docAvatar, setDocAvatar] = useState(null);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const navigateTo = useNavigate();

  const handleRequestToJoin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("role", "Doctor");
      formData.append("doctorEducation", doctorEducation);
      formData.append("doctorDegrees", doctorDegrees);
      formData.append("doctorDepartment", doctorDepartment);
      if (doctorDocuments) {
        for (let i = 0; i < doctorDocuments.length; i++) {
          formData.append("doctorDocuments", doctorDocuments[i]);
        }
      }
      if (docAvatar) {
        formData.append("docAvatar", docAvatar);
      }

      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/request-to-join`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
          setDoctorEducation("");
          setDoctorDegrees("");
          setDoctorDepartment("");
          setDoctorDocuments(null);
          setDocAvatar(null);
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container form-component request-to-join-form">
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "150px",
            height: "150px",
            display: "block",
            margin: "0 auto",
          }}
        />
        <h1
          className="form-title"
          style={{ fontSize: "30px", textAlign: "center" }}
        >
          REQUEST TO JOIN AS DOCTOR
        </h1>
        <form onSubmit={handleRequestToJoin}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Education (e.g., MBBS, MD)"
              value={doctorEducation}
              onChange={(e) => setDoctorEducation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Degrees (comma-separated, e.g., MBBS, MD)"
              value={doctorDegrees}
              onChange={(e) => setDoctorDegrees(e.target.value)}
            />
          </div>
          <div>
            <select
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
            <div className="file-input-group">
              <p style={{ fontSize: "20px", color: "green" }}>Doctor Documents</p>
              <input
                type="file"
                multiple
                onChange={(e) => setDoctorDocuments(e.target.files)}
                accept="application/pdf,image/*"
                placeholder="Upload Documents (PDF, Images)"
              />
            </div>
          </div>
          <div>
            <div className="file-input-group">
              <p style={{ fontSize: "20px", color: "green" }}>Doctor Avatar</p>
              <input
                type="file"
                onChange={(e) => setDocAvatar(e.target.files[0])}
                accept="image/*"
                placeholder="Upload Profile Picture"
              />
            </div>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">SUBMIT REQUEST</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default RequestToJoin;