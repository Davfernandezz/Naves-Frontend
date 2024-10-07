import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentAccess } from '../../services/personApiCalls';
import "./Person.css";

export const Person = () => {
  const [personData, setPersonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    } else {
      fetchCurrentAccess();
    }
  }, [passport, navigate]);

  const fetchCurrentAccess = async () => {
    setIsLoading(true);
    try {
      const userId = passport.tokenData.id;
      const response = await getCurrentAccess(userId, passport.token);
      if (response.success) {
        setPersonData(response.data);
      } else {
        console.log(response.message || "Failed to fetch current access");
      }
    } catch (error) {
      console.error("Error fetching current access:", error.message);
    }
    setIsLoading(false);
  };

  const goToAccess = () => {
    navigate("/access");
  };
  return (
    <div className="person-wrapper">
      <div className="person-container">
        {personData && (
          <div className="welcome-message text-center mb-4">
            <h1 className="welcome-title">Welcome back,</h1>
            <h2 className="welcome-name">{personData.person.name}!</h2>
          </div>
        )}
        <h3 className="person-title text-center mb-4">Your current profile:</h3>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : personData ? (
          <div className="person-info">
            <div className="info-card mb-4">
              <p><strong>Email:</strong> {personData.person.email}</p>
              <p><strong>DNI:</strong> {personData.person.dni}</p>
            </div>
            {personData.current_access ? (
              <div className="access-info mt-4">
                <h4 className="access-subtitle text-center mb-3">Current Access:</h4>
                <div className="info-card">
                  <p><strong>Room:</strong> {personData.current_access.room_name}</p>
                  <p><strong>Room ID:</strong> {personData.current_access.room_id}</p>
                  <p><strong>Entry Time:</strong> {new Date(personData.current_access.entry_datetime).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="no-access mt-4">
                <p className="text-center">You are not currently in any room.</p>
              </div>
            )}
            <button onClick={goToAccess} className="btn btn-primary w-100 person-button mt-4">
              Manage Access
            </button>
          </div>
        ) : (
          <p className="text-center">No data found.</p>
        )}
      </div>
    </div>
  );
}