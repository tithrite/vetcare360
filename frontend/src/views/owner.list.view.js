import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getOwnerByLastName } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'; 

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const renderRow = (owner) => (
    <tr key={owner._id}>
      <td>
        <Link to={`/owners/${owner._id}`}>
          {`${owner.firstName} ${owner.lastName}`} 
        </Link>
      </td>
      <td className='hidden-sm hidden-xs'>{owner.address}</td>
      <td>{owner.city}</td>
      <td>{owner.telephone}</td>
      <td className='hidden-xs'>
        {owner.pets && Array.isArray(owner.pets) && owner.pets.length > 0
          ? owner.pets.map(pet => pet.name).join(', ')
          : 'No pets'}
      </td>
    </tr>
  );

  const getFilterFromLocation = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('lastName') || '';
  };

  const fetchData = async (filter) => {
    if (!filter) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getOwnerByLastName(filter);
      setOwners(data);
      if (data.length === 0) {
        setError('No owners found with this last name.');
      }
    } catch (err) {
      setError('Error fetching owners.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filter = getFilterFromLocation();
    fetchData(filter);
  }, [location.search]);

  const renderOwners = () => (
    <section>
      <h3 style={{ marginBottom: "15px" }}><strong>Owners</strong></h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='hidden-sm hidden-xs'>Address</th>
            <th>City</th>
            <th>Telephone</th>
            <th className='hidden-xs'>Pets</th>
          </tr>
        </thead>
        <tbody>
          {owners.map(renderRow)}
        </tbody>
      </table>
    </section>
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {owners.length > 0 && renderOwners()}
    </div>
  );
};

export default OwnerList;