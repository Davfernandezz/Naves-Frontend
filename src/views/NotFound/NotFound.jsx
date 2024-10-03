import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <h1 className="notfound-title text-center mb-2">404</h1>
        <h2 className="notfound-subtitle text-center mb-4">Page Not Found</h2>
        <p className="text-center mb-4">Sorry, the page you are looking for does not exist.</p>
        <div className="text-center">
          <button className="btn btn-primary notfound-button" onClick={goToHome}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}