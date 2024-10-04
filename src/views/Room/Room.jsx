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
      navigate("/login");
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
    <div className="room-wrapper">
      <div className="room-container">
        <h1 className="room-title text-center mb-2">Room Status</h1>
        <h2 className="room-subtitle text-center mb-4">Discover the rooms and all their information:</h2>
        <div className="search-container mb-4">
          <input
            type="text"
            value={roomId}
            onChange={handleInputChange}
            placeholder="Enter Room ID"
            className="form-control room-input mb-3"
          />
          <button 
            onClick={fetchRoomStatus} 
            className="btn btn-primary room-button" 
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Get Status"}
          </button>
        </div>
        {roomStatus && (
          <div className="status-info">
            <h3 className="room-name text-center mb-3">Room: {roomStatus.room_name}</h3>
            <div className="room-details mb-4">
              <p><strong>Capacity:</strong> {roomStatus.capacity}</p>
              <p><strong>Room Type:</strong> {roomStatus.room_type}</p>
              <p><strong>Current Occupancy:</strong> {roomStatus.current_occupancy}</p>
              <p><strong>Future Reservations:</strong> {roomStatus.future_reservations}</p>
            </div>
            <div className="occupants-list">
              <h3 className="occupants-title mb-3">Current Occupants</h3>
              {roomStatus.occupants.length > 0 ? (
                <ul className="list-unstyled">
                  {roomStatus.occupants.map((occupant, index) => (
                    <li key={index} className="mb-2">
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
}