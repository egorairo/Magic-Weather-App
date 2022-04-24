import axios from 'axios';

const api = () => {
  return axios.create({
    baseURL:
      'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/',
  });
};

async function fetchLocations(location) {
  const {data} = await api().get(`location/search/?query=${location}`);

  return data.length > 0 ? data : null;
}

async function fetchLocationWeatherById(id) {
  const {data} = await api().get(`location/${id}/`);

  return data;
}

export async function fetchWeather(location) {
  const locations = await fetchLocations(location);

  if (locations) {
    const weatherModal = await fetchLocationWeatherById(locations[0].woeid);

    return weatherModal;
  }

  return null;
}
