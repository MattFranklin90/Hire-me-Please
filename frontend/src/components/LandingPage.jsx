import React, { useState } from "react";
import axios from "axios";
import "../index.css";

const API_URL = "http://localhost:5000/api/auth";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e, type) => {
    if (type === "login") {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, loginData);
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, registerData);
      alert("Registration Successful! Please log in.");
      setActiveTab("login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Image Section */}
      <div className="auth-image">
        <img src="/login-image.png" alt="Login Illustration" />
      </div>

      {/* Authentication Section */}
      <div className="auth-content">
        <header className="header">
          <h1 className="hire-me-title">Hire Me, Please!</h1>
          <p className="tagline">Get your act together with this application tracking tool</p>
        </header>

        <div className="tab-switcher">
          <button 
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`} 
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button 
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`} 
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={loginData.email} 
              onChange={(e) => handleChange(e, "login")} 
              required 
            />

            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={loginData.password} 
              onChange={(e) => handleChange(e, "login")} 
              required 
            />

            <button type="submit" className="auth-btn">Login</button>

            <p className="register-text">
              New user?{" "}
              <button onClick={() => setActiveTab("register")} className="switch-btn">
                Register here
              </button>
            </p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Enter your username" 
              value={registerData.username} 
              onChange={(e) => handleChange(e, "register")} 
              required 
            />

            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={registerData.email} 
              onChange={(e) => handleChange(e, "register")} 
              required 
            />

            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              value={registerData.password} 
              onChange={(e) => handleChange(e, "register")} 
              required 
            />

            <button type="submit" className="auth-btn">Register</button>

            <p className="register-text">
              Already have an account?{" "}
              <button onClick={() => setActiveTab("login")} className="switch-btn">
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
