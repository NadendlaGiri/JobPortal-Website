import React, { useEffect, useState } from "react";
import { fetchJobs } from "./services/jobService";
import "bootstrap/dist/css/bootstrap.min.css";
// import SidebarAd from "./SidebarAd";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data))
      .catch((error) => console.error("Failed to fetch jobs", error));
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      {/* Sidebar Advertisement */}
      {/* <SidebarAd /> */}

      {/* Header */}
      <header className="bg-dark text-white py-4 shadow d-flex align-items-center position-relative px-4">
        {/* Logo on the far left */}
        <img
          src="/logo1.png"
          alt="CareerConnect Logo"
          style={{ height: "60px", marginRight: "20px" }}
        />

        {/* Text perfectly centered over the entire header */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ width: "100%" }}
        >
          <h1 className="display-5 fw-bold mb-1">
            🚀 CareerConnect — Find Your Dream Job Today!
          </h1>
          <p className="mb-0">Connecting talent with opportunity 💼</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-5 flex-grow-1">
        <h2 className="text-center mb-4">✨ Available Jobs ✨</h2>

        {jobs.length === 0 ? (
          <p className="text-center">No jobs available right now.</p>
        ) : (
          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-4 mb-4" key={job.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {job.company}
                    </h6>
                    <p className="card-text">{job.description}</p>
                    <p className="card-text">
                      <small className="text-muted">📍 {job.location}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        🗓️ Posted on:{" "}
                        {new Date(job.postedDate).toLocaleDateString()}
                      </small>
                    </p>
                    <a
                      href={job.url}
                      className="btn btn-primary mt-auto"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-light text-center py-4 border-top mt-auto">
        <p className="mb-1">
          © {new Date().getFullYear()} CareerConnect. All rights reserved.
        </p>
        <p className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
          Disclaimer: This site redirects to job listings from other companies.
          We don’t guarantee hiring.
        </p>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <p className="mb-1 fw-semibold">Reach out to us:</p>
            <a
              href="https://www.linkedin.com/in/nadendla-giri-a08aa0244/"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none"
            >
              🔗 LinkedIn
            </a>

            <a
              href="https://nadendlagiri.github.io/My-Portfolio/"
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none "
            >
              💼 Portfolio
            </a>

            <a
              href="mailto:girinadendla1234@gmail.com"
              className="text-decoration-none"
            >
              📧 Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
