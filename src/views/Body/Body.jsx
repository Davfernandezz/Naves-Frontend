import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../Login/Login";

function Body() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}
export default Body;
