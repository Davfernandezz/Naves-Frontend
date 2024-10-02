import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { registerReserve } from '../../services/accessApiCalls';
import './Reserve.css';

export const Reserve = () => {
    const [roomId, setRoomId] = useState('');
    const [entryDatetime, setEntryDatetime] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { passport } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const reservationData = {
                room_id: parseInt(roomId),
                entry_datetime: new Date(entryDatetime).toISOString()
            };

            console.log("Reservation data to send:", reservationData);

            const response = await registerReserve(reservationData, passport.token);

            if (response.success) {
                console.log('Reservation registered successfully!');
                setRoomId('');
                setEntryDatetime('');
            } else {
                console.log(response.message || 'Could not register the reservation');
            }
        } catch (error) {
            console.error('Error occurred while registering the reservation:', error);
            console.log(error.message || 'Error occurred while registering the reservation');
        }

        setIsLoading(false);
    };

    return (
        <div className="reserve-container">
            <h2>Register Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="roomId">Room ID:</label>
                    <input
                        type="number"
                        id="roomId"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="entryDatetime">Entry Date and Time:</label>
                    <input
                        type="datetime-local"
                        id="entryDatetime"
                        value={entryDatetime}
                        onChange={(e) => setEntryDatetime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register Reservation'}
                </button>
            </form>
        </div>
    );
}