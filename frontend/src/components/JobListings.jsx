import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../JobListings.css";

const JobListings = () => {
  const navigate = useNavigate();  // Initialize navigate

  const jobListings = [
    {
      title: "Software Engineer",
      company: "TechCorp",
      description: "Join our team to develop cutting-edge software solutions.",
    },
    {
      title: "Web Developer",
      company: "WebWorks",
      description: "Build dynamic and responsive web applications with us.",
    },
    {
      title: "Data Scientist",
      company: "DataX",
      description: "Analyze data to help drive strategic decision-making.",
    },
  ];

  return (
    <div className="job-listings-container">
      <div className="job-listings-header">
        <h1 className="job-listings-title">Job Listings</h1>
        <p className="job-listings-description">
          Explore job opportunities and take the next step in your career.
        </p>
      </div>

      <div className="job-filter">
        <select>
          <option value="">Filter by</option>
          <option value="software">Software</option>
          <option value="web">Web Development</option>
          <option value="data">Data Science</option>
        </select>

        {/* Profile Button */}
        <button onClick={() => navigate("/profile")} className="profile-button">
          Profile
        </button>
      </div>

      {jobListings.map((job, index) => (
        <div key={index} className="job-card">
          <div className="job-card-header">
            <h3 className="job-card-title">{job.title}</h3>
            <span className="job-card-company">{job.company}</span>
          </div>
          <p className="job-card-description">{job.description}</p>
          <div className="job-card-footer">
            <button className="job-card-button">Apply Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListings;