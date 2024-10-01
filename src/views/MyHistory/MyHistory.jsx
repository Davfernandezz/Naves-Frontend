import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAccessHistory } from '../../services/personApiCalls';
import "./MyHistory.css";

export const MyHistory = () => {
    const [accessHistory, setAccessHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const { passport } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!passport || !passport.token) {
        navigate("/login");
      } else {
        fetchAccessHistory();
      }
    }, [passport, navigate]);
  
    const fetchAccessHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userId = passport.tokenData.id;
        const response = await getAccessHistory(userId, passport.token);
  
        if (response.success) {
          setAccessHistory(response.data.access_history);
        } else {
          setError(response.message || "Failed to fetch access history");
        }
      } catch (error) {
        console.error("Error fetching access history:", error);
        setError("An error occurred while fetching access history");
      }
      setIsLoading(false);
    };
  
    return (
      <div className="my-history-wrapper">
        <div className="my-history-container">
          <h1>My Access History</h1>
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
          {accessHistory && accessHistory.length > 0 ? (
            <ul className="history-list">
              {accessHistory.map((access, index) => (
                <li key={index} className="history-item">
                  <h3>Room: {access.room_name}</h3>
                  <p>Room ID: {access.room_id}</p>
                  <p>Entry: {new Date(access.entry_datetime).toLocaleString()}</p>
                  {access.exit_datetime && (
                    <p>Exit: {new Date(access.exit_datetime).toLocaleString()}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No access history available.</p>
          )}
        </div>
      </div>
    );
  }