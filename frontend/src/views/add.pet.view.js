import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPet } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'; 

const AddPet = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: '',
    birthDate: '',
    type: '',
  });

  const [petTypes, setPetTypes] = useState([]);
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
    
      try {
        const typesResponse = await fetch('http://localhost:5000/api/pets/types');
        if (!typesResponse.ok) {
          throw new Error(`HTTP error! status: ${typesResponse.status}`);
        }
        const typesData = await typesResponse.json();
        setPetTypes(typesData);
    
        const ownerResponse = await fetch(`http://localhost:5000/api/owners/${id}`);
        if (!ownerResponse.ok) {
          throw new Error(`HTTP error! status: ${ownerResponse.status}`);
        }
        const ownerData = await ownerResponse.json();
        setOwner(ownerData);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({
      ...pet,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!pet.name || !pet.birthDate || !pet.type) {
      setError('All fields are required');
      return;
    }
  
    setIsLoading(true);
  
    try {
      await createPet({
        ownerId: id,        
        name: pet.name,
        birthDate: pet.birthDate,
        type: pet.type
      });
      
      navigate(`/owners/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 style={{ marginBottom: "15px" }}><strong>Add New Pet</strong></h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            className="form-control"
            id="owner"
            value={owner ? `${owner.firstName} ${owner.lastName}` : ''}
            readOnly  
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter name"
            value={pet.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            value={pet.birthDate}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
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
        </div>

        <div className="form-group">
          <button
            type="submit"
            className="btn add-pet-button"
            style={{ marginBottom: "45px" }}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;