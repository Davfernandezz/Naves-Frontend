import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../Login/Login";
import Register from '../Register/Register';
import { Home } from '../Home/Home';
import { Access } from '../Access/Access';
import { Room } from '../Room/Room';
import { Person } from '../Person/Person';
import { AccessHistory } from '../accessHistory/accessHistory';
import { NotFound } from '../NotFound/NotFound';
import { MyHistory } from '../MyHistory/Myhistory';
import { Reserve } from '../Reserve/Reserve';
import { Administration } from '../Administration/Administration';

function Body() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/access" element={<Access />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/room" element={<Room />} />
        <Route path="/person" element={<Person />} />
        <Route path="/myHistory" element={<MyHistory />} />
        <Route path="/accessHistory" element={<AccessHistory />} />
        <Route path="/administration" element={<Administration />} />
      </Routes>
    </>
  );
}
export default Body;
