import React, {useState} from 'react';

import s from './WeatherSideBar.module.css';

export default function SideBar({title, today}) {
  const options = {weekday: 'short', day: 'numeric', month: 'long'};

  return (
    <div className={s.sidebarWeather}>
      <span className={`${s.cloud1} ${s.materialIcons}`}>cloud</span>
      <span className={`${s.cloud2} ${s.materialIcons}`}>cloud</span>
      <div className={s.sidebarWeather}>
        <img
          className={s.weatherImg}
          src={`https://www.metaweather.com/static/img/weather/png/${today.weather_state_abbr}.png`}
        ></img>
        <p className={s.weatherTemperature}>{Math.round(today.max_temp)}°C</p>
        <p className={s.weatherState}>{today.weather_state_name}</p>
        <div>
          <p className={s.weatherDate}>
            Today •{' '}
            {new Date(today.applicable_date).toLocaleString('en-US', options)}
          </p>
          <div className={s.location}>
            <span className={`${s.mr} ${s.materialIcons}`}>place</span>
            <p className={s.weatherLocation}>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
