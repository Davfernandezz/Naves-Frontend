import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../Login/Login";
import Register from '../Register/Register';
import { Home } from '../Home/Home';
import { Access } from '../Access/Access';
import { Room } from '../Room/Room';
import { Person } from '../Person/Person';

function Body() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/access" element={<Access />} />
        <Route path="/room" element={<Room />} />
        <Route path="/person" element={<Person />} />
      </Routes>
    </>
  );
}
export default Body;
