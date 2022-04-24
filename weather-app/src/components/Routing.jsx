import React from 'react';
import {Route, Routes} from 'react-router-dom';

import SearchLocation from '../pages/SearchLocation';
import Weather from '../pages/Weather';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<SearchLocation />} />
      <Route path="/weather/:location" element={<Weather />} />
    </Routes>
  );
}
