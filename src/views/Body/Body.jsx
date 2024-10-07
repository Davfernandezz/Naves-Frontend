import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../Login/Login";
import Register from '../Register/Register';
import { Home } from '../Home/Home';
import { Access } from '../Access/Access';
import { Room } from '../Room/Room';
import { Person } from '../Person/Person';
import { NotFound } from '../NotFound/NotFound';
import { MyHistory } from '../MyHistory/Myhistory';
import { Reserve } from '../Reserve/Reserve';
import AccessHistory from '../accessHistory/accessHistory';
import { GenerateReport } from '../GenerateReport/GenerateReport';
import Administration from '../Administration/Administration';
import { GetReport } from '../GetReport/GetReport';
import { RoomUsage } from '../RoomUsage/RoomUsage';

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
        <Route path="/generateReport" element={<GenerateReport />} />
        <Route path="/getReport" element={<GetReport />} />
        <Route path="/roomUsage" element={<RoomUsage />} />
      </Routes>
    </>
  );
}
export default Body;
