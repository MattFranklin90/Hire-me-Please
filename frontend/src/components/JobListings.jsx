import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../JobListings.css";

const JobListings = () => {
  const navigate = useNavigate();  // Initialize navigate
  const [jobListings, setJobListings] = useState([]);  // State to store job listings
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch job listings from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs"); // Update with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch job listings.");
        }
        const data = await response.json();
        setJobListings(data);  // Set job data to state
      } catch (err) {
        setError(err.message);  // Handle errors
      } finally {
        setLoading(false);  // Set loading to false when data is fetched
      }
    };

    fetchJobs();
  }, []);

  // Render loading, error, or job listings
  if (loading) {
    return <div>Loading job listings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
