import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../JobListings.css";

const JobListings = () => {
  const navigate = useNavigate();
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = "https://jsearch.p.rapidapi.com/search?query=Software%20Developer&num_pages=1"; // Adjust query as needed

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.REACT_APP_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Failed to fetch job listings: ${response.status}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Debug response
        setJobListings(data.data || []); // Adjust based on API response format
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading job listings...</div>;
  if (error) return <div>Error: {error}</div>;

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

        <button onClick={() => navigate("/profile")} className="profile-button">
          Profile
        </button>
      </div>

      {jobListings.length === 0 ? (
        <div>No job listings available.</div>
      ) : (
        jobListings.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-card-header">
              <h3 className="job-card-title">{job.job_title || "No Title"}</h3>
              <span className="job-card-company">{job.employer_name || "Unknown Company"}</span>
            </div>
            <p className="job-card-description">{job.job_description || "No Description Available"}</p>
            <div className="job-card-footer">
              <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                <button className="job-card-button">Apply Now</button>
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobListings;
