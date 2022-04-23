import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
//import Modal from 'react-modal';

import WeatherSection from '../WeatherSection/WeatherSection';

import s from './Weather.module.css';

export default function Weather() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = () => {
    return axios.create({
      baseURL:
        'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/',
    });
  };

  async function fetchLocations(location) {
    try {
      const {data} = await api().get(`location/search/?query=${location}`);

      return data.length > 0 ? data : null;
    } catch (error) {
      setError(error);
    }
  }

  async function fetchLocationWeatherById(id) {
    const {data} = await api().get(`location/${id}/`);

    return data;
  }

  async function fetchWeather(location) {
    try {
      const locations = await fetchLocations(location);

      if (locations) {
        const weather = await fetchLocationWeatherById(locations[0].woeid);

        return weather;
      }

      return null;
    } catch (error) {
      setError(error);
    }
  }

  // const init = async () => {
  //   const locationWeather = await fetchWeather(location.location);

  //   setWeather(locationWeather);
  //   setIsLoading(false);
  //   setLoaded(true);
  //   setIsClicking(true);
  // };

  // useEffect(async () => {
  //   const locationWeather = await fetchWeather(location.location);

  //   setError(locationWeather);
  // }, [locationWeather]);

  const handleClick = useCallback(
    async (event) => {
      event.preventDefault();

      setIsLoading(true);

      const locationWeather = await fetchWeather(location.location);

      setWeather(locationWeather);
      setIsLoading(false);
      setLoaded(true);
    },
    [weather, loaded, isLoading]
  );

  return (
    <div className={s.container}>
      <>
        <div className={s.search}>
          <h2 className={s.mb6}>
            <span className={s.title}>Magic Weather</span>
          </h2>
          <form onSubmit={handleClick}>
            <input
              type="text"
              name="location"
              placeholder="City"
              onChange={(e) =>
                setLocation((prevValue) => ({
                  ...prevValue,
                  location: e.target.value,
                }))
              }
            ></input>
            <button
              className={s.searchButton}
              type="submit"
              onClick={handleClick}
            >
              Search
            </button>
            {isLoading && (
              <p className={s.searchModalLoading}>
                <span className={`${s.loadingIcon} ${s.materialIcons}`}>
                  explore
                </span>
                Loading
              </p>
            )}
            {error && <p>Error: {error}</p>}
            {loaded && !weather && (
              <p className={s.searchModalLoading}>Not found, try again</p>
            )}
          </form>
        </div>
        {loaded && weather && <WeatherSection weather={weather} />}
      </>
    </div>
  );
}
