import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {


    // Redirect to the login page after logout
    navigate('/log');

    // Optionally, you can display a logout message
    alert('You are logged out');
  };

  return (
    <div>
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand">PlateVista</span>
          <button className="btn btn-danger logout-button" onClick={handleLogout}>
            <i className="fa fa-sign-out log-button-a" aria-hidden="false"></i>Logout
          </button>
          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/detect">
                  Detect
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dataentery">
                  Data Entery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/livestream">
                  Live Stream
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
