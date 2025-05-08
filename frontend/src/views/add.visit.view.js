import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById, createVisit } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const AddVisit = () => {
  const { ownerId, petId } = useParams();
  const [pet, setPet] = useState(null);
  const [visit, setVisit] = useState({
    date: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPetData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const petResponse = await getPetById(petId);
        if (!petResponse) {
          throw new Error('Pet not found');
        }
        setPet(petResponse);
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
    setVisit({
      ...visit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!visit.date || !visit.description) {
      setError('All fields are required');
      return;
    }
    setIsLoading(true);
    try {
      const newVisit = await createVisit({
        pet: petId,
        date: visit.date,
        description: visit.description,
      });

      setPet((prevPet) => ({
        ...prevPet,
        visits: [...(prevPet.visits || []), newVisit], 
      }));

      setVisit({
        date: '',
        description: '',
      });

      setError(null);
    } catch (err) {
      setError('Error creating visit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 style={{ marginBottom: "15px" }}><strong>New Visit</strong></h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {pet && (
        <div>
          <h5><strong>Pet</strong></h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Type</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pet.name}</td>
                <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
                <td>{pet.type}</td>
                <td>{pet.owner ? `${pet.owner.firstName} ${pet.owner.lastName}` : 'Owner not found'}</td>
              </tr>
            </tbody>
          </table>

          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={visit.date}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={visit.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn add-visit-button"
                style={{ marginBottom: "45px" }}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Visit'}
              </button>
            </div>
          </form>

          <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>Previous Visits</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: "20px" }}>
            <thead>
              <tr>
                <th style={{
                  backgroundColor: 'lightgray',
                  color: 'black',
                  textAlign: 'left',
                  padding: '10px',
                  fontSize: '20px',
                  border: 'none'
                }}>
                  Date
                </th>
                <th style={{
                  backgroundColor: 'lightgray',
                  color: 'black',
                  textAlign: 'left',
                  padding: '10px',
                  fontSize: '20px',
                  border: 'none'
                }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {pet.visits && pet.visits.length > 0 ? (
                pet.visits.map((visit, index) => (
                  <tr key={visit._id}>
                    <td style={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderBottom: '1px solid lightgray',
                      fontSize: '20px',
                      padding: '8px'
                    }}>
                      {new Date(visit.date).toLocaleDateString()}
                    </td>
                    <td style={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderBottom: '1px solid lightgray',
                      fontSize: '20px',
                      padding: '8px'
                    }}>
                      {visit.description}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{
                    backgroundColor: 'white',
                    border: 'none',
                    fontSize: '20px',
                    padding: '8px'
                  }}>
                    No visits recorded for this pet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddVisit;