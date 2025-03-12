import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../JobListings.css";

const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterJobType, setFilterJobType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = "https://jsearch.p.rapidapi.com/search?query=Software%20Developer&num_pages=1";
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
        setJobListings(data.data || []);
        setFilteredJobs(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobListings.filter(job =>
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.employer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterCategory) {
      filtered = filtered.filter(job =>
        job.job_title.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    if (filterJobType) {
      filtered = filtered.filter(job => job.job_type && job.job_type.toLowerCase().includes(filterJobType.toLowerCase()));
    }

    filtered = filtered.sort((a, b) => a.job_title.localeCompare(b.job_title));

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterJobType, jobListings]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  const saveJob = (job, button) => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const jobExists = savedJobs.some(savedJob => savedJob.job_title === job.job_title);

    if (!jobExists) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

      button.classList.add("active");
      button.innerText = "Saved";

      setTimeout(() => {
        button.classList.remove("active");
        button.innerText = "Save";
      }, 1500);
    }
  };

  if (loading) return <div>Loading job listings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="job-listings-container">
      <div className="job-listings-header">
        <h1 className="job-listings-title">Job Listings</h1>
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <select className="filter-dropdown" onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="software">Software Developer</option>
            <option value="web">Web Development</option>
            <option value="data">Data Science</option>
          </select>
          <select className="filter-dropdown" onChange={(e) => setFilterJobType(e.target.value)}>
            <option value="">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      </div>

      <div className="nav-buttons">
        <div className="go-to-login">
          <Link to="/">
            <button className="go-to-login-btn">Login</button>
          </Link>
        </div>
        <div className="go-to-profile">
          <Link to="/profile">
            <button className="go-to-profile-btn">Profile</button>
          </Link>
        </div>
      </div>

      <div className="job-cards-container">
        {currentJobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-card-header">
              <h3 className="job-card-title">{job.job_title || "No Title"}</h3>
              <span className="job-card-company">{job.employer_name || "Unknown Company"}</span>
            </div>
            <p className="job-card-description">
              {job.job_description.length > 200 ? job.job_description.substring(0, 200) + "..." : job.job_description}
            </p>
            <div className="job-card-footer">
              <button className="read-more-btn" onClick={() => openModal(job)}>Read More</button>
              <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                <button className="apply-btn">Apply Now</button>
              </a>
              <button
                className="save-job-btn"
                onClick={(e) => saveJob(job, e.target)}
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {Math.ceil(filteredJobs.length / jobsPerPage)}</span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}>Next</button>
      </div>

      {/* Modal */}
      {modalOpen && selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedJob.job_title}</h2>
              <button className="close-modal-btn" onClick={closeModal}>X</button>
            </div>
            <div className="modal-body">
              <p>{selectedJob.job_description}</p>
            </div>
            <a href={selectedJob.job_apply_link} target="_blank" rel="noopener noreferrer">
              <button className="apply-now-btn">Apply Now</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;
