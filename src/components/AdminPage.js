import React, { useState } from "react";

function AdminPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      title,
      company,
      location,
      link,
      description,
    };

    try {
      const res = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        setMessage("Job added successfully, bujji! 🎉");
        setTitle("");
        setCompany("");
        setLocation("");
        setLink("");
        setDescription("");
      } else {
        setMessage("Failed to add job. Try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add New Job</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          className="form-control mb-3"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="form-control mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Apply Link"
          className="form-control mb-3"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button className="btn btn-success w-100" type="submit">
          Add Job
        </button>
      </form>
    </div>
  );
}

export default AdminPage;
