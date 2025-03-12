import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../UserProfile.css"; // Add the necessary styles

const UserProfile = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  // Fetch saved jobs from localStorage
  useEffect(() => {
    const savedJobsFromStorage = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(savedJobsFromStorage);
  }, []);

  // Handle deleting a job from saved jobs
  const deleteJob = (jobId) => {
    const updatedSavedJobs = savedJobs.filter((job) => job.job_id !== jobId);
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  // Handle updating job status and color change
  const updateJobStatus = (jobId, status) => {
    const updatedSavedJobs = savedJobs.map((job) =>
      job.job_id === jobId ? { ...job, status } : job
    );
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
  };

  // Function to determine the status word color for Accepted, Rejected, and Pending
  const getStatusWordColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#4caf50"; // Green for Accepted
      case "Rejected":
        return "#e53935"; // Red for Rejected
      case "Pending":
        return "#9b74d4"; // Purple for Pending
      default:
        return "#9b74d4"; // Default to purple for any other status
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
        <Link to="/jobs">
          <button className="go-to-jobs-btn">Back to Job Listings</button>
        </Link>
      </div>

      <div className="saved-jobs">
        <h3>Saved Jobs</h3>
        {savedJobs.length === 0 ? (
          <p>No saved jobs yet. Start saving your favorite jobs!</p>
        ) : (
          <ul className="saved-jobs-list">
            {savedJobs.map((job) => (
              <li key={job.job_id} className="saved-job-item">
                <div className="job-info">
                  <h4>{job.job_title}</h4>
                  <p>{job.employer_name}</p>
                  <p>
                    Status:{" "}
                    <span
                      style={{
                        color: getStatusWordColor(job.status || "Pending"), // Default to "Pending" color
                      }}
                    >
                      {job.status || "Pending"}
                    </span>
                  </p>
                </div>
                <div className="job-actions">
                  <button
                    className="delete-job-btn"
                    onClick={() => deleteJob(job.job_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="accept-job-btn"
                    onClick={() => updateJobStatus(job.job_id, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-job-btn"
                    onClick={() => updateJobStatus(job.job_id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
