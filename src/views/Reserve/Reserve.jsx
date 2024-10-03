import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cancelReservation, getActiveReservation, registerReserve } from '../../services/accessApiCalls';
import './Reserve.css';

export const Reserve = () => {
    const [roomId, setRoomId] = useState('');
    const [entryDatetime, setEntryDatetime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [activeReservation, setActiveReservation] = useState(null);

    const { passport } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!passport || !passport.token) {
            navigate('/');
        } else {
            fetchActiveReservation();
        }
    }, [passport, navigate]);

    const fetchActiveReservation = async () => {
        setIsLoading(true);
        try {
            const response = await getActiveReservation(passport.token);
            if (response.success && response.data) {
                setActiveReservation(response.data);
            } else {
                setActiveReservation(null);
            }
        } catch (error) {
            console.error('Error fetching active reservation:', error);
            setActiveReservation(null);
        }
        setIsLoading(false);
    };

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
                fetchActiveReservation();
                setRoomId('');
                setEntryDatetime('');
            } else {
                console.log(response.message || 'Could not register the reservation');
            }
        } catch (error) {
            console.error('Error occurred while registering the reservation:', error);
        }

        setIsLoading(false);
    };

    const handleCancel = async () => {
        if (!activeReservation) return;

        setIsLoading(true);
        try {
            const response = await cancelReservation(activeReservation.id, passport.token);
            if (response.success) {
                console.log('Reservation cancelled successfully!');
                setActiveReservation(null);
            } else {
                console.log(response.message || 'Could not cancel the reservation');
            }
        } catch (error) {
            console.error('Error occurred while cancelling the reservation:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="reserve-wrapper">
            <div className="reserve-container">
                <h1 className="reserve-title text-center mb-4">Manage Reservations</h1>
                
                {activeReservation ? (
                    <div className="active-reservation">
                        <h2 className="reserve-subtitle text-center mb-3">Your Active Reservation</h2>
                        <p>Room ID: {activeReservation.room_id}</p>
                        <p>Entry Time: {new Date(activeReservation.entry_datetime).toLocaleString()}</p>
                        <button 
                            onClick={handleCancel} 
                            disabled={isLoading}
                            className="btn btn-danger w-100 reserve-button"
                        >
                            {isLoading ? 'Cancelling...' : 'Cancel Reservation'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2 className="reserve-subtitle text-center mb-3">Register New Reservation</h2>
                        <div className="mb-3">
                            <input
                                type="number"
                                id="roomId"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                required
                                placeholder="Room ID"
                                className="form-control reserve-input"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="datetime-local"
                                id="entryDatetime"
                                value={entryDatetime}
                                onChange={(e) => setEntryDatetime(e.target.value)}
                                required
                                className="form-control reserve-input"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="btn btn-primary w-100 reserve-button"
                        >
                            {isLoading ? 'Registering...' : 'Register Reservation'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}