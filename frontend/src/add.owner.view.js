import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOwner } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'; 

const AddOwner = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const newOwner = await createOwner(formData);
      console.log('New Owner Created:', newOwner); 

      navigate(`/owners/${newOwner._id}`);
    } catch (err) {
      setError('Error creating owner. Please try again.');
      console.error('Error creating owner:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 fw-bold">Add New Owner</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="telephone" className="form-label">Telephone</label>
            <input
              type="tel"
              className="form-control"
              id="telephone"
              name="telephone"
              placeholder="Enter phone number"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className='add-owner-button'
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Owner'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOwner;
