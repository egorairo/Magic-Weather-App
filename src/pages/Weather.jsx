import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

import WeatherSideBar from 'components/WeatherSideBar/WeatherSideBar';
import WeatherDetailedSection from 'components/WeatherDetailedSection/WeatherDetailedSection';

export default function Weather() {
  const navigate = useNavigate();

  const weather = useSelector((state) => state.weather);
  console.log(weather);

  useEffect(() => {
    if (!weather.title) {
      console.log('work');
      navigate('/');
    }
  }, []);

  return (
    <>
      <WeatherSideBar />
      <WeatherDetailedSection />
    </>
  );
}
