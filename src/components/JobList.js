import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h3>No jobs available right now.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Available Jobs</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {jobs.map((job) => (
          <Col key={job.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.company} - {job.location}
                </Card.Subtitle>
                <Card.Text>
                  {job.description && job.description.length > 100
                    ? job.description.slice(0, 100) + "..."
                    : job.description || "No description available."}
                </Card.Text>
                <Button
                  variant="primary"
                  href={job.url} //{/* use 'url' as per your backend model */}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Job
                </Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Posted on{" "}
                  {job.postedDate
                    ? new Date(job.postedDate).toLocaleDateString()
                    : "Unknown"}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobList;
