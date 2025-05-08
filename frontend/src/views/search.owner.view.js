import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getOwnerByLastName } from '../api/api';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css'; 

const SearchOwner = () => {
  const [lastName, setLastName] = useState('');
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const renderRow = (owner) => (
    <tr key={owner._id}>
      <td>
        <Link to={`/owners/${owner._id}`}>
          {owner.name} 
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

  const onFilterChange = (e) => {
    setLastName(e.target.value);
  };

  const submitSearchForm = (e) => {
    e.preventDefault();
    navigate(`/owners/list?lastName=${encodeURIComponent(lastName)}`);
  };

  useEffect(() => {
    const filter = getFilterFromLocation();
    setLastName(filter);
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
    <span>
      <section>
        <h3 style={{ marginBottom: "15px" }}><strong>Find Owners</strong></h3>

        <form className='form-horizontal' onSubmit={submitSearchForm}>
          <div className='form-group'>
            <div className='control-group' id='lastName'>
              <label className='col-sm-2 control-label'>Last name </label>
              <div className='col-sm-10'>
                <input
                  className='form-control'
                  name='lastName'
                  placeholder="Enter name"
                  value={lastName || ''}
                  onChange={onFilterChange}
                  size={100}
                  maxLength={80}
                />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                type='submit'
                className='find-owner-button'
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Find Owner'}
              </button>
            </div>
          </div>
        </form>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}
      {owners.length > 0 && renderOwners()}

      <Link className='add-owner-button' to='/owners/new'>
        Add Owner
      </Link>
    </span>
  );
};

export default SearchOwner;