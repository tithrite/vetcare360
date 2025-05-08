import React, { useEffect, useState } from "react";
import petsImage from '../assets/images/pets.png';

const Error = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/oups')
      .then(response => response.json())
      .then(data => setError(data))
      .catch(() => setError(null));
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '25px',
      textAlign: 'center'
    }}>
      <img src={petsImage} alt="Pets" style={{ width: '375px', height: 'auto', marginBottom: '20px' }} />

      <h1 style={{ color: '#dc3545', fontSize: '2.3rem', marginBottom: '15px' }}>
        Oops! Something went wrong.
      </h1>

      <p style={{ fontSize: '20px', color: '#555', marginBottom: '15px' }}>
        We're sorry for the inconvenience. Please try again later.
      </p>

      {error ? (
        <div style={{ backgroundColor: '#f8d7da', padding: '20px', borderRadius: '8px', color: '#721c24' }}>
          <p><strong>Error Code:</strong> {error.status}</p>
          <p><strong>Details:</strong> {error.message}</p>
        </div>
      ) : (
        <p style={{ fontSize: '20px', color: '#888' }}>
          No detailed error information available.
        </p>
      )}
    </div>
  );
};

export default Error;
