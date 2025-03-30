import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [doctorEducation, setDoctorEducation] = useState("");
  const [doctorDegrees, setDoctorDegrees] = useState("");
  const [doctorDocuments, setDoctorDocuments] = useState([]);
  const [doctorDocumentsPreview, setDoctorDocumentsPreview] = useState([]);

  const navigateTo = useNavigate();

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

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleDocuments = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
    const fileObjects = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        previews.push(reader.result);
        fileObjects.push(file);
        if (previews.length === files.length) {
          setDoctorDocumentsPreview(previews);
          setDoctorDocuments(fileObjects);
        }
      };
    });
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      formData.append("doctorEducation", doctorEducation);
      formData.append("doctorDegrees", doctorDegrees.split(",").map((degree) => degree.trim()));
      doctorDocuments.forEach((doc) => {
        formData.append("doctorDocuments", doc);
      });

      await axios
        .post("http://localhost:4000/api/v1/user/doctor/addNew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
          setDoctorDepartment("");
          setDocAvatar("");
          setDocAvatarPreview("");
          setDoctorEducation("");
          setDoctorDegrees("");
          setDoctorDocuments([]);
          setDoctorDocumentsPreview([]);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="add-doctor-page">
      <section className="add-doctor-container add-doctor-form">
        <img src="/logo.png" alt="logo" className="add-doctor-logo" />
        <h1 className="add-doctor-form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="add-doctor-first-wrapper">
            <div className="add-doctor-avatar-section">
            
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                }
                alt="Doctor Avatar"
                className="add-doctor-avatar-preview"
              />
              <label style={{fontWeight:'bolder',fontSize:'25px',color:'blue'}}>Doctor Avatar</label>
              <input
                type="file"
                onChange={handleAvatar}
                className="add-doctor-file-input"
              />
            </div>
            <div className="add-doctor-form-fields">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="add-doctor-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="add-doctor-input"
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="add-doctor-input"
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="add-doctor-input"
              />
              <input
                type="number"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="add-doctor-input"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="add-doctor-input"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="add-doctor-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="add-doctor-input"
              />
              <select
                value={doctorDepartment}
                onChange={(e) => setDoctorDepartment(e.target.value)}
                className="add-doctor-select"
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Education (e.g., MBBS from XYZ University)"
                value={doctorEducation}
                onChange={(e) => setDoctorEducation(e.target.value)}
                className="add-doctor-input"
              />
              <input
                type="text"
                placeholder="Degrees (comma-separated, e.g., MBBS, MD)"
                value={doctorDegrees}
                onChange={(e) => setDoctorDegrees(e.target.value)}
                className="add-doctor-input"
              />
              <div className="add-doctor-documents-section">
                <label style={{fontWeight:'bolder',fontSize:'25px',color:'blue'}}>Submit Documents</label><br></br>
                <input
                  type="file"
                  multiple
                  onChange={handleDocuments}
                  accept="image/*"
                  className="add-doctor-file-input"
                />
                <div className="add-doctor-document-previews">
                  {doctorDocumentsPreview.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Document ${index + 1}`}
                      className="add-doctor-document-preview"
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="add-doctor-submit-btn">
                Register New Doctor
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;