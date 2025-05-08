import React from 'react';
import petsImage from '../assets/images/pets.png'; 

const Home = () => (
  <div className="container text-center my-5">
    <div className="mb-5">
      <h1 className="display-5 fw-bold" style={{ color: "green" }}>Welcome to VetCare360</h1>
      <p className="lead text-dark fw-normal mt-4">
        Your complete solution for managing pet care and veterinary services.
      </p>
    </div>

    <div className="row justify-content-center mb-2">
      <div className="col-md-3">
        <img
          src={petsImage}
          alt="Pets"
          className="img-fluid rounded shadow-sm"
          style={{ width: "100%", height: "auto" }} 
        />
      </div>
    </div>


    <div className="mt-5">
      <p className="text-muted fs-5 fw-semibold small mb-0" style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif" }}>
        Designed and Developed by:&nbsp;
        <span className="text-muted fs-5 fw-bold" style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif" }} >Tithrite Ait Addi</span>&nbsp;·&nbsp;
        <span className="text-muted fs-5 fw-bold" style={{ fontSize: "1rem", fontFamily: "Inter, sans-serif" }} >[First Name] [Last Name]</span>
      </p>
    </div>

  </div>
);

export default Home;