import React, { useState } from "react";
import axios from "axios";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = "bujjikanna123"; // Your admin password

  // Job form states
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  // Jobs list
  const [jobs, setJobs] = useState([]);

  // Delete modal state
  const [deleteAlert, setDeleteAlert] = useState({
    visible: false,
    jobId: null,
  });

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setPassword("");
      fetchJobs();
    } else {
      alert("Wrong password, try again please!");
    }
  };

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://jobportal-backend-6p11.onrender.com/jobs"
      );
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // Add new job handler
  const handleAddJob = async (e) => {
    e.preventDefault();
    const newJob = { title, company, location, description, url };
    try {
      await axios.post(
        "https://jobportal-backend-6p11.onrender.com/jobs",
        newJob
      );
      alert("Job added successfully!");
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setUrl("");
      fetchJobs();
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job");
    }
  };

  // Show delete confirmation modal
  const showDeleteAlert = (id) => {
    setDeleteAlert({ visible: true, jobId: id });
  };

  // Hide delete confirmation modal
  const hideDeleteAlert = () => {
    setDeleteAlert({ visible: false, jobId: null });
  };

  // Confirm and delete job
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/jobs/${deleteAlert.jobId}`);
      setJobs(jobs.filter((job) => job.id !== deleteAlert.jobId));
      hideDeleteAlert();
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mt-5 d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleLogin} style={{ width: "320px" }}>
          <h2 className="mb-4 text-center">🔒 Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <header className="mb-4 p-3 bg-primary text-white rounded shadow-sm text-center">
        <h1 style={{ fontWeight: "700", letterSpacing: "1.2px" }}>
          🚀 CareerConnect Admin Panel
        </h1>
        <p className="mb-0" style={{ fontStyle: "italic" }}>
          Manage jobs with love 💖 and ease!
        </p>
      </header>

      <h2 className="mb-4">➕ Add New Job</h2>
      <form onSubmit={handleAddJob}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-control mb-2"
          required
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control mb-2"
          rows={3}
          required
        />
        <input
          type="url"
          placeholder="Job URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-control mb-3"
          required
        />
        <div className="d-flex justify-content-between mb-5">
          <button type="submit" className="btn btn-success me-3">
            Add Job
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setIsLoggedIn(false)}
            type="button"
          >
            Logout
          </button>
        </div>
      </form>

      <h3 className="mb-3">📝 Existing Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="list-group mb-5">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{job.title}</strong> at {job.company} ({job.location})
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => showDeleteAlert(job.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      {deleteAlert.visible && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h4 style={{ marginBottom: "1rem", color: "#d6336c" }}>
              ⚠️ Confirm Delete
            </h4>
            <p>Are you sure you want to delete this job?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "1.5rem",
              }}
            >
              <button
                style={{ ...buttonStyle, backgroundColor: "#d6336c" }}
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
                onClick={hideDeleteAlert}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles for modal overlay and buttons
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050,
  backdropFilter: "blur(4px)",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const buttonStyle = {
  border: "none",
  color: "white",
  padding: "0.6rem 1.4rem",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Admin;
