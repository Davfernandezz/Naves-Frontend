import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import "./Access.css";
import { registerEntry } from '../../services/accessApiCalls';

export const Access = () => {
  const [entryData, setEntryData] = useState({
      room_id: ""
  });

  const { passport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
      if (!passport || !passport.token) {
          navigate("/");
      }
  }, [passport, navigate]);

  const inputHandler = (e) => {
      setEntryData({
          ...entryData,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async () => {
      try {
          const response = await registerEntry(entryData, passport.token);
          if (response.success) {
              navigate("/dashboard");
          }
      } catch (error) {
          console.log(error);
      }
  };

  return (
      <div className="entry-registration-wrapper">
          <div className="entry-registration-container">
              <h1>Register Entry</h1>
              <h3>Enter the room ID to register your entry</h3>
              <div className="form-container">
                  <input
                      type="text"
                      value={entryData.room_id}
                      name="room_id"
                      placeholder="Room ID"
                      onChange={(e) => inputHandler(e)}
                      className="form-control"
                  />
                  <input
                      type="button"
                      value="Register Entry"
                      onClick={handleSubmit}
                      className="btn-confirm"
                  />
              </div>
          </div>
      </div>
  );
}