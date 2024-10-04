import React, { useState, useEffect } from 'react';
import { getAccessHistories, getRoomAccessHistories } from '../../services/accessHistoryApiCalls';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AccessHistory.css';

export const AccessHistory = () => {
  const [accessData, setAccessData] = useState({
    startDate: '',
    endDate: '',
    roomId: ''
  });
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleItems, setVisibleItems] = useState(2);

  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    }
  }, [passport, navigate]);

  const inputHandler = (e) => {
    setAccessData({
      ...accessData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAccessHistories = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setHistories([]);
    setVisibleItems(2);

    try {
      let response;
      if (accessData.roomId) {
        response = await getRoomAccessHistories(passport.token, accessData.roomId, accessData.startDate, accessData.endDate);
      } else {
        response = await getAccessHistories(passport.token, accessData.startDate, accessData.endDate);
      }

      if (response.success) {
        setHistories(accessData.roomId ? response.data.access_histories : response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 2);
  };

  return (
    <div className="history-wrapper">
      <div className="history-container">
        <h1 className="history-title text-center mb-2">Access History</h1>
        <h2 className="history-subtitle text-center mb-2">Search for Entries and Exits:</h2>
        {error && <p className="error-message text-center mb-3">{error}</p>}
        <form onSubmit={fetchAccessHistories}>
          <div className="mb-3">
            <input
              type="date"
              name="startDate"
              value={accessData.startDate}
              onChange={inputHandler}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              name="endDate"
              value={accessData.endDate}
              onChange={inputHandler}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="roomId"
              value={accessData.roomId}
              onChange={inputHandler}
              placeholder="Room ID (optional)"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 access-history-button">
            Show Access History
          </button>
        </form>
  
        {isLoading && <p className="text-center mt-4">Loading...</p>}
        
        {histories.length > 0 && (
          <div className="mt-4">
            <h2 className="text-center mb-3">Results</h2>
            <ul className="history-list">
              {histories.slice(0, visibleItems).map((history) => (
                <li key={history.id} className="history-item mb-4">
                  <h3 className="history-item-title">{history.room_name}</h3>
                  <p>Room ID: {history.room_id}</p>
                  <p>Person: {history.person_name}</p>
                  <p>Entry: {new Date(history.entry_datetime).toLocaleString()}</p>
                  {history.exit_datetime && (
                    <p>Exit: {new Date(history.exit_datetime).toLocaleString()}</p>
                  )}
                </li>
              ))}
            </ul>
            {visibleItems < histories.length && (
              <div className="text-center mt-4">
                <button onClick={loadMore} className="btn btn-primary load-more-button">
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessHistory;