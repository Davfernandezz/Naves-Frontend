import React, { useState, useEffect } from 'react';
import './AccessHistory.css';
import { getAccessHistories, getRoomAccessHistories } from '../../services/accessHistoryApiCalls';
import { useAuth } from '../../contexts/AuthContext';

export const AccessHistory = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { passport } = useAuth();

  const fetchAccessHistories = async (e) => {
    e.preventDefault();
    if (!passport || !passport.token) {
      setError('You must be logged in to view access histories.');
      return;
    }

    setIsLoading(true);
    setError('');
    setHistories([]);

    try {
      let response;
      if (roomId) {
        response = await getRoomAccessHistories(passport.token, roomId, startDate, endDate);
      } else {
        response = await getAccessHistories(passport.token, startDate, endDate);
      }

      if (response.success) {
        setHistories(roomId ? response.data.access_histories : response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="access-history-wrapper">
      <div className="access-history-container">
        <h1 className="access-history-title text-center mb-4">Access History</h1>
        <form onSubmit={fetchAccessHistories}>
          <div className="mb-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room ID (optional)"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 access-history-button">
            Fetch Access History
          </button>
        </form>

        {isLoading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="error-message text-center mt-4">{error}</p>}
        
        {histories.length > 0 && (
          <div className="mt-4">
            <h2 className="text-center mb-3">Results</h2>
            <ul className="access-history-list">
              {histories.map((history) => (
                <li key={history.id} className="access-history-item">
                  <p><strong>Person:</strong> {history.person_name}</p>
                  <p><strong>Room:</strong> {history.room_name}</p>
                  <p><strong>Entry:</strong> {new Date(history.entry_datetime).toLocaleString()}</p>
                  <p><strong>Exit:</strong> {history.exit_datetime ? new Date(history.exit_datetime).toLocaleString() : 'N/A'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessHistory;