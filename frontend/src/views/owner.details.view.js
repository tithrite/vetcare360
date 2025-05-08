import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOwnerById } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'; 

const OwnerDetails = () => {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getOwnerById(id);
        setOwner(data);
      } catch (err) {
        setError('Error fetching owner details.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwner();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!owner) return <div>No owner found.</div>;

  return (
    <div className="container mt-4">
      <h3 style={{ marginBottom: "15px" }}><strong>Owner Information</strong></h3>

      <OwnerInformation owner={owner} />
      <PetsAndVisits owner={owner} />
    </div>
  );
};

const OwnerInformation = ({ owner }) => (
  <section>
    <table className="table table-striped owner-info-table">
      <tbody>
        <tr>
          <th>Name</th>
          <td><strong>{owner.firstName} {owner.lastName}</strong></td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{owner.address}</td>
        </tr>
        <tr>
          <th>City</th>
          <td>{owner.city}</td>
        </tr>
        <tr>
          <th>Telephone</th>
          <td>{owner.telephone}</td>
        </tr>
      </tbody>
    </table>

    <Link to={`/owners/${owner._id}/edit`} className="btn edit-owner-button">Edit Owner</Link>
    &nbsp;
    <Link to={`/owners/${owner._id}/pets/new`} className="btn add-pet-button">Add New Pet</Link>
  </section>
);

const PetsAndVisits = ({ owner }) => (
  <section>
    <h3 style={{ marginTop: "20px", marginBottom: "20px"}}>Pets and Visits</h3>
    <table className="table table-striped">
      <tbody>
        {owner.pets.map((pet) => (
          <tr key={pet._id}>
            <td style={{ verticalAlign: 'top' }}>
              <dl className="dl-horizontal">
                <dt>Name</dt>
                <dd>{pet.name}</dd>
                <dt>Birth Date</dt>
                <dd>{new Date(pet.birthDate).toLocaleDateString()}</dd>
                <dt>Type</dt>
                <dd>{pet.type}</dd>
              </dl>
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <VisitsTable ownerId={owner._id} pet={pet} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

const VisitsTable = ({ ownerId, pet }) => (
  <table style={{ borderCollapse: "collapse", width: "675px" }}>
    <thead>
      <tr>
        <th
          style={{
            border: "none",
            textAlign: "left",
            padding: "8px",
            width: "375px",
            background: "none",
            color: "black",
            fontWeight: "bold"
          }}
        >
          Visit Date
        </th>
        <th
          style={{
            border: "none",
            textAlign: "left",
            padding: "8px",
            width: "375px",
            background: "none",
            color: "black",
            fontWeight: "bold"
          }}
        >
          Description
        </th>
      </tr>
    </thead>
    <tbody>
      {pet.visits && pet.visits.length > 0 ? (
        pet.visits.map((visit) => (
          <tr key={visit._id}>
            <td style={{ border: "none", padding: "8px" }}>
              {new Date(visit.date).toLocaleDateString()}
            </td>
            <td style={{ border: "none", padding: "8px" }}>
              {visit.description || 'No description provided'}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td style={{ border: "none", padding: "8px" }} colSpan="2">
            No visits recorded for this pet.
          </td>
        </tr>
      )}
      <tr>
        <td style={{ border: "none", padding: "8px" }}>
          <Link to={`/owners/${ownerId}/pets/${pet._id}/edit`}>Edit Pet</Link>
        </td>
        <td style={{ border: "none", padding: "8px" }}>
          <Link to={`/owners/${ownerId}/pets/${pet._id}/visits/new`}>Add Visit</Link>
        </td>
      </tr>
    </tbody>
  </table>
);



export default OwnerDetails;