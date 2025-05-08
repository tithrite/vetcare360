import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOwnerById, updateOwner } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const EditOwner = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchOwner = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getOwnerById(id);
        setFormData(data);
      } catch (err) {
        setError('Error fetching owner details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const updatedOwner = await updateOwner(id, formData);
      console.log('Owner updated:', updatedOwner);
      navigate(`/owners/${id}`);
    } catch (err) {
      setError('Error updating owner. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 fw-bold">Edit Owner</h3>

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
            className='update-owner-button
'
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Owner'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOwner;
