import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAccessHistory } from '../../services/personApiCalls';
import "./MyHistory.css";

export const MyHistory = () => {
  const [accessHistory, setAccessHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState(2);

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
      setError("Error occurred while fetching access history");
    }
    setIsLoading(false);
  };

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 2);
  };

  const goToAccess = () => {
    navigate('/access');
  };

  return (
    <div className="history-wrapper">
      <div className="history-container">
        <h1 className="history-title text-center mb-2">My Access History</h1>
        <h2 className="history-subtitle text-center mb-4">Recent Entries and Exits:</h2>
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="error text-center">Error: {error}</p>}
        {accessHistory && accessHistory.length > 0 ? (
          <>
            <ul className="history-list">
              {accessHistory.slice(0, visibleItems).map((access, index) => (
                <li key={index} className="history-item mb-4">
                  <h3 className="history-item-title">{access.room_name}</h3>
                  <p>Room ID: {access.room_id}</p>
                  <p>Entry: {new Date(access.entry_datetime).toLocaleString()}</p>
                  {access.exit_datetime && (
                    <p>Exit: {new Date(access.exit_datetime).toLocaleString()}</p>
                  )}
                </li>
              ))}
            </ul>
            {visibleItems < accessHistory.length && (
              <div className="text-center mt-4">
                <button onClick={loadMore} className="btn btn-primary load-more-button">
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4">No access history available.</p>
            <button onClick={goToAccess} className="btn btn-primary access-button">
              Go to Access Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}