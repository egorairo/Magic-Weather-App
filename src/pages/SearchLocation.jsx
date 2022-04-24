import React from 'react';

import {SearchWeatherForm} from '../entities/weather';

import '../weather.css';

export default function SearchLocation() {
  return (
    <div className="container">
      <>
        <div className="search">
          <h2 className="mb6">
            <span className="title">Magic Weather</span>
          </h2>
          <SearchWeatherForm />
        </div>
      </>
    </div>
  );
}
