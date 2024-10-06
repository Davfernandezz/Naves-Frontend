import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getRoomUsageStats } from '../../services/administrationApiCalls';
import './RoomUsage.css';

export const RoomUsage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/login");
    } else {
      fetchRoomUsageStats();
    }
  }, [passport, navigate]);

  const fetchRoomUsageStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRoomUsageStats(passport.token);
      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.message || "Could not retrieve room usage statistics");
      }
    } catch (error) {
      setError("Error retrieving room usage statistics: " + (error.message || "Unknown error"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="room-usage-wrapper">
      <div className="room-usage-container">
        <h1 className="room-usage-title">Room Usage Statistics</h1>
        {error && <p className="room-usage-error">{error}</p>}
        {loading && <p className="room-usage-loading">Loading statistics...</p>}
        {stats && (
          <div className="room-usage-content">
            <h2 className="room-usage-subtitle">Period: {stats.period}</h2>
            <p>Days in period: {stats.days_in_period}</p>
            <p>Total Accesses: {stats.total_accesses}</p>
            <p>Total Cancellations: {stats.total_cancellations}</p>
            <p>Total Hours Used: {stats.total_hours_used}</p>

            <ul className="room-usage-list">
              {stats.room_stats.map((room, index) => (
                <li key={index} className="room-usage-item">
                  <h4>{room.room_name}</h4>
                  <p>Total Accesses: {room.total_accesses}</p>
                  <p>Completed Accesses: {room.completed_accesses}</p>
                  <p>Cancelled Accesses: {room.cancelled_accesses}</p>
                  <p>Total Hours Used: {room.total_hours_used}</p>
                  <p>Average Duration: {room.average_duration} hours</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomUsage;