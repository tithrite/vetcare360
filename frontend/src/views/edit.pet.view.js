import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById, updatePet } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'; 

const EditPet = () => {
  const { ownerId, petId } = useParams(); 
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    birthDate: '',
    type: '',
  });
  const [petTypes, setPetTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const typesResponse = await fetch('http://localhost:5000/api/pets/types');
        if (!typesResponse.ok) {
          throw new Error(`HTTP error! status: ${typesResponse.status}`);
        }
        const typesData = await typesResponse.json();
        setPetTypes(typesData);

        const petData = await getPetById(petId);
        setPet({
          name: petData.name,
          birthDate: new Date(petData.birthDate).toISOString().split('T')[0],
          type: petData.type,
        });
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPetData();
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({
      ...pet,
      [name]: value,
    });
    if (!value.trim()) {
      setFieldErrors({ ...fieldErrors, [name]: 'This field is required.' });
    } else {
      const newErrors = { ...fieldErrors };
      delete newErrors[name];
      setFieldErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(fieldErrors).length > 0) {
      setError('Please fix the errors before submitting.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updatedPet = await updatePet(petId, pet);
      console.log('Pet updated:', updatedPet);
      navigate(`/owners/${ownerId}`);
    } catch (err) {
      setError('Error updating pet. Please try again.');
      console.error('Error updating pet:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 style={{ marginBottom: "15px" }}><strong>Edit Pet</strong></h3>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            placeholder="Enter name"
            value={pet.name}
            onChange={handleChange}
            required
          />
          {fieldErrors.name && (
            <div className="invalid-feedback">{fieldErrors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            className={`form-control ${fieldErrors.birthDate ? 'is-invalid' : ''}`}
            id="birthDate"
            name="birthDate"
            value={pet.birthDate}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
          />
          {fieldErrors.birthDate && (
            <div className="invalid-feedback">{fieldErrors.birthDate}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className={`form-control ${fieldErrors.type ? 'is-invalid' : ''}`}
            id="type"
            name="type"
            value={pet.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            {petTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {fieldErrors.type && (
            <div className="invalid-feedback">{fieldErrors.type}</div>
          )}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn update-pet-button"
            style={{ marginBottom: "45px" }}
            disabled={isLoading || Object.keys(fieldErrors).length > 0}
          >
            {isLoading ? 'Updating...' : 'Update Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPet;