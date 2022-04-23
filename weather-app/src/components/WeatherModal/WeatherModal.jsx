import React, {useState, useCallback} from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import WeatherSection from '../WeatherSection/WeatherSection';

import s from './WeatherModal.module.css';

export default function WeatherModal({isShow, onClose, today}) {
  const [location, setLocation] = useState('');
  const [weatherModal, setWeatherModal] = useState([]);
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
        const weatherModal = await fetchLocationWeatherById(locations[0].woeid);

        return weatherModal;
      }

      return null;
    } catch (error) {
      setError(error);
    }
  }

  const handleClick = useCallback(async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const locationWeather = await fetchWeather(location.location);

    setWeatherModal(locationWeather);
    setIsLoading(false);
    setLoaded(true);

    if (weatherModal) {
      onClose();
    }
  });

  return (
    <div>
      <>
        <Modal
          isOpen={isShow}
          onRequestClose={onClose}
          ariaHideApp={false}
          style={{
            overlay: {
              zIndex: 10,
            },
            content: {
              padding: 0,
              border: 0,
              inset: null,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          }}
        >
          <button className={s.searchClose} onClick={onClose}>
            <span className={s.materialIcons}>close</span>
          </button>
          <div className={s.searchModal}>
            <h2 className={s.mb6}>
              <span className={s.title}>Magic weatherModal</span>
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
              {loaded && !weatherModal && (
                <p className={s.searchModalLoading}>Not found, try again</p>
              )}
            </form>
          </div>
        </Modal>
        {loaded && weatherModal && (
          <WeatherSection weatherModal={weatherModal} />
        )}
      </>
    </div>
  );
}
