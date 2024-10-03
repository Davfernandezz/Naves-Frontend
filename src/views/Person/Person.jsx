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
      navigate("/");
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
        <h1 className="person-title text-center mb-4">Your Current Status</h1>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : personData ? (
          <div className="person-info">
            <h2 className="person-subtitle text-center mb-3">{personData.person.name} {personData.person.surnames}</h2>
            <p>Email: {personData.person.email}</p>
            <p>DNI: {personData.person.dni}</p>
            {personData.current_access ? (
              <div className="access-info mt-4">
                <h3 className="access-subtitle text-center mb-3">Current Access</h3>
                <p>Room: {personData.current_access.room_name} (ID: {personData.current_access.room_id})</p>
                <p>Entry Time: {new Date(personData.current_access.entry_datetime).toLocaleString()}</p>
              </div>
            ) : (
              <div className="no-access mt-4">
                <p className="text-center">You are not currently in any room.</p>
              </div>
            )}
            <button onClick={goToAccess} className="btn btn-primary w-100 person-button mt-4">
              Go to Access Page
            </button>
          </div>
        ) : (
          <p className="text-center">No data found.</p>
        )}
      </div>
    </div>
  );
}