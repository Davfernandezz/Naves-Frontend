import React, {useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentRoomStatus} from '../../services/roomApiCalls';
import "./Room.css";

export const Room = () => {
  const [roomId, setRoomId] = useState("");
  const [roomStatus, setRoomStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!passport || !passport.token) {
      navigate("/");
    }
  }, [passport, navigate]);

  const handleInputChange = (e) => {
    setRoomId(e.target.value);
  };

  const fetchRoomStatus = async () => {
    if (!roomId) {
      console.log("Please enter a room ID");
      return;
    }

    setIsLoading(true);
    setRoomStatus(null);

    try {
      const response = await getCurrentRoomStatus(roomId, passport.token);
      if (response.success) {
        setRoomStatus(response.data);
      } else {
        console.log(response.message || "Failed to fetch room status");
      }
    } catch (error) {
      console.error("Error fetching room status:", error.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="room-status-wrapper">
      <div className="room-status-container">
        <h1>Room Status</h1>
        <div className="search-container">
          <input
            type="text"
            value={roomId}
            onChange={handleInputChange}
            placeholder="Enter Room ID"
            className="room-id-input"
          />
          <button onClick={fetchRoomStatus} className="search-button" disabled={isLoading}>
            {isLoading ? "Loading..." : "Get Status"}
          </button>
        </div>
        {roomStatus && (
          <div className="status-info">
            <h2>Room: {roomStatus.room_name}</h2>
            <p>Capacity: {roomStatus.capacity}</p>
            <p>Room Type: {roomStatus.room_type}</p>
            <p>Current Occupancy: {roomStatus.current_occupancy}</p>
            <p>Future Reservations: {roomStatus.future_reservations}</p>
            <div className="occupants-list">
              <h3>Current Occupants</h3>
              {roomStatus.occupants.length > 0 ? (
                <ul>
                  {roomStatus.occupants.map((occupant, index) => (
                    <li key={index}>
                      {occupant.name} {occupant.surnames} - {occupant.email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No occupants at the moment</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};