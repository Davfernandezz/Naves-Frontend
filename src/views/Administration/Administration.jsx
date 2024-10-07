import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Administration.css';

export const Administration = () => {

  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  return (
    <div className="admin-home-wrapper">
      <div className="admin-container">
        <h2 className="admin-title">Administration Panel</h2>
        <h3 className="admin-subtitle">Manage and generate reports for the access control system</h3>
        <div className="button-container">
          <button
            onClick={() => navigate('/generateReport')}
            className="admin-btn"
          >
            Generate Daily Report
          </button>
          <button
            onClick={() => navigate('/getReport')}
            className="admin-btn"
          >
            Get Reports by Date Range
          </button>
          <button
            onClick={() => navigate('/roomUsage')}
            className="admin-btn"
          >
            Get Room Usage Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Administration;