import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home page">
      <div className="content">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1>Welcome to e-HOSPITAL</h1>
        <p>
          Welcome to e-HOSPITAL Admin Page. Log in as an admin to access the dashboard and manage doctors, patients, and more.
        </p>
        <Link to="/login" className="login-btn">
          Login as Admin
        </Link>
      </div>
    </section>
  );
};

export default Home;