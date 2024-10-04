import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { registerEntry, registerExit } from '../../services/accessApiCalls';
import "./Access.css";

export const Access = () => {
  const [accessData, setAccessData] = useState({
    room_id: ""
  });
  const [isEntry, setIsEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (isEntry) {
        response = await registerEntry(accessData, passport.token);
      } else {
        response = await registerExit(accessData, passport.token);
      }
      if (response.success) {
        navigate("/person");
      } else {
        setError(response.message || `Failed to register ${isEntry ? 'entry' : 'exit'}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="access-wrapper">
      <div className="access-container">
        <h1 className="access-title text-center mb-2">
          {isEntry ? "Register Entry" : "Register Exit"}
        </h1>
        <h2 className="access-subtitle text-center mb-2">
          Enter the room ID to register your {isEntry ? "entry" : "exit"}:
        </h2>
        {error && <p className="error-message text-center mb-3">{error}</p>}
        <div className="form-container">
          <input
            type="text"
            value={accessData.room_id}
            name="room_id"
            placeholder="Room ID"
            onChange={(e) => inputHandler(e)}
            className="form-control access-input mb-3"
          />
          <button
            onClick={handleSubmit}
            className="btn btn-primary access-button mb-3"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isEntry ? "Register Entry" : "Register Exit")}
          </button>
          <button 
            onClick={() => setIsEntry(!isEntry)} 
            className="btn btn-secondary access-switch-button"
            disabled={isLoading}
          >
            Switch to {isEntry ? "Exit" : "Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Access;