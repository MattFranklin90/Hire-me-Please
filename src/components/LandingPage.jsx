import React from "react";
import "../index.css"; // Ensure styles are correctly linked

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="hire-me-title">Hire Me, Please!</h1>
        <p className="tagline">Get your act together with this application tracking tool</p>
      </header>

      {/* Job Description */}
      <section className="job-description-section">
        <p className="job-description">
          Job hunting got you down? <strong>Hire Me, Please!</strong> can help you find opportunities and keep track of applications. Simply create an account, log in, and browse all available job openings in your area. Good luck!
        </p>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <h2>Sign in to get started</h2>
        <form className="login-form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-text">
          New user? <a href="/register">Register here</a>
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
