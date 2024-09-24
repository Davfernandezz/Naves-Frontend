import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../Login/Login";
import Register from '../Register/Register';

function Body() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
export default Body;
