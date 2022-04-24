import React, {useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import * as actions from '../reducer';
import {fetchWeather} from '../api';

import 'weather.css';

export default function Form({onWeather}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = useCallback(
    async (event) => {
      try {
        event.preventDefault();
        setIsLoading(true);

        const weather = await fetchWeather(location);

        setWeather(weather);

        if (onWeather) {
          onWeather();
        }

        dispatch(actions.setWeather(weather));

        setIsLoading(false);
        setLoaded(true);

        navigate(`/weather/${weather.title.toLowerCase()}`);
      } catch (err) {
        setIsLoading(false);
        setLoaded(true);
      }
    },
    [dispatch, location, navigate, onWeather]
  );

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="location"
        placeholder="City"
        onChange={(e) => setLocation(e.target.value.trim())}
      ></input>
      <button className="searchButton" type="submit">
        Search
      </button>
      {isLoading && (
        <p className="searchModalLoading">
          <span className="loadingIcon materialIcons">explore</span>
          Loading
        </p>
      )}
      {loaded && (!weather || !weather.title) && (
        <p className="searchModalLoading">Not found, please try again</p>
      )}
    </form>
  );
}
