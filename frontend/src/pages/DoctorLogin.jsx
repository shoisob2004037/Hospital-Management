// src/components/DoctorLogin.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const DoctorLogin = () => {
  const { setIsDoctorAuthenticated, setDoctor } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/doctor/login`,
        { email, password, confirmPassword, role: "Doctor" },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsDoctorAuthenticated(true);
      setDoctor(res.data.user);
      navigate("/doctor/me");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container doctor-auth-container">
      <h1>Doctor Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered? <Link to="/doctor/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default DoctorLogin;