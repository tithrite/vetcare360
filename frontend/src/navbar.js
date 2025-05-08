import React from "react";
import { NavLink } from "react-router-dom";  
import "bootstrap/dist/css/bootstrap.min.css"; 
import '../assets/styles/navbar.css'; 

const MenuItem = ({ url, title, icon, children }) => (
  <li className="nav-item">
    <NavLink className="nav-link" to={url} title={title}>
      <span className={`bi ${icon}`}></span> &nbsp;
      <span>{children}</span>
    </NavLink>
  </li>
);

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        <NavLink className="navbar-brand fw-bold" to="/">
          VetCare360
        </NavLink>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav mb-lg-0"> 
            <MenuItem url="/" title="Home" icon="bi-house-door-fill">
              Home
            </MenuItem>

            <MenuItem url="/owners/search" title="Find Owners" icon="bi-search">
              Find Owners
            </MenuItem>

            <MenuItem url="/veterinarians" title="Veterinarians" icon="bi-list-ul">
              Veterinarians
            </MenuItem>

            <MenuItem url="/error" title="Trigger an Error" icon="bi-exclamation-triangle">
              Error
            </MenuItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;