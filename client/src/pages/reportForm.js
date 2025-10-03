import React, { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submissions, setSubmissions] = useState([]); // New: array to hold all submitted data

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setSubmissions([...submissions, formData]); // Add current formData to submissions
      setShowModal(true);
      setFormData({ name: '', email: '', query: '' });
    }

    setValidated(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Report Form</h1>

      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter a valid email.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="query">Queries/Complaints:</label>
          <textarea
            className="form-control"
            id="query"
            rows="3"
            value={formData.query}
            onChange={handleChange}
            required
          ></textarea>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your form was submitted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display Cards */}
      <div className="mt-5">
        <h3 className="mb-3">Submitted Reports</h3>
        <div className="row">
          {submissions.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.email}</Card.Subtitle>
                  <Card.Text>{item.query}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
