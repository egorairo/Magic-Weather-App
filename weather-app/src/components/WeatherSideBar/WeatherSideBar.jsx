import React from 'react';
import {useSelector} from 'react-redux';

import s from './WeatherSideBar.module.css';

const OPTIONS = {weekday: 'short', day: 'numeric', month: 'long'};

export default function SideBar() {
  const weather = useSelector((state) => state.weather);

  const {title, consolidated_weather: [todayWeather] = []} = weather;

  return (
    <div className={s.sidebarWeather}>
      <span className={`${s.cloud1} ${s.materialIcons}`}>cloud</span>
      <span className={`${s.cloud2} ${s.materialIcons}`}>cloud</span>
      <div className={s.sidebarWeather}>
        <img
          className={s.weatherImg}
          src={`https://www.metaweather.com/static/img/weather/png/${todayWeather?.weather_state_abbr}.png`}
        ></img>
        <p className={s.weatherTemperature}>
          {Math.round(todayWeather?.max_temp)}°C
        </p>
        <p className={s.weatherState}>{todayWeather?.weather_state_name}</p>
        <div>
          <p className={s.weatherDate}>
            Today •{' '}
            {new Date(todayWeather?.applicable_date).toLocaleString(
              'en-US',
              OPTIONS
            )}
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
