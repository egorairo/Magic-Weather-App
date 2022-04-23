import React from 'react';

import DetailedScreen from '../WeatherDetailedSection/WeatherDetailedSection';
import SideBar from '../WeatherSideBar/WeatherSideBar';

export default function WeatherSection({weather, weatherModal}) {
  const {
    title,
    consolidated_weather: [today, ...otherDays],
  } = weather || weatherModal;

  return (
    <>
      <SideBar title={title} today={today} />
      <DetailedScreen title={title} today={today} otherDays={otherDays} />
    </>
  );
}
