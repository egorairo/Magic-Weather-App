import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {
  getElByDataSelector,
  replaceCharAtIndex,
  getRandomInt,
} from '../../entities/weather/utils';

import WeatherModal from '../WeatherModal/WeatherModal';

import s from './WeatherDetailedSection.module.css';

let magicIntervalId = null;

const pElsInitialValues = {};

const EMOJIS = [...Array(600000).keys()]
  .map((v) => String.fromCharCode(v))
  .filter((v) =>
    /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu.test(
      v
    )
  );

const OPTIONS = {weekday: 'short', day: 'numeric', month: 'long'};

export default function DetailedScreen() {
  const [doingMagic, setDoingMagic] = useState(false);

  const weather = useSelector((state) => state.weather);

  function runMagic() {
    setDoingMagic(true);

    Array.from(document.querySelectorAll('p')).forEach((el, index) => {
      el.dataset.mark = index;
      pElsInitialValues[index] = el.innerHTML;
    });

    magicIntervalId = setInterval(() => {
      Array.from(document.querySelectorAll('p')).forEach((el, index) => {
        const str = el.innerHTML;

        el.innerHTML = replaceCharAtIndex({
          string: str,
          index: getRandomInt(str.length),
          char: EMOJIS[getRandomInt(EMOJIS.length)],
        });
      });
    }, 500);
  }

  function stopMagic() {
    setDoingMagic(false);

    if (magicIntervalId) {
      clearTimeout(magicIntervalId);

      Object.keys(pElsInitialValues).forEach((mark) => {
        getElByDataSelector({selector: 'mark', value: mark}).innerHTML =
          pElsInitialValues[mark];
      });
    }
  }

  const {consolidated_weather: [todayWeather, ...otherDaysWeather] = []} =
    weather;

  const [showModal, setShowModal] = useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.detailedWeather}>
          <div className={s.topBar}>
            <button className={s.searchButton} onClick={handleSearchClick}>
              <span className={`${s.searchIcon} ${s.materialIcons}`}>
                search
              </span>
            </button>
            {!doingMagic ? (
              <button className={s.makeMagicBtn} onClick={runMagic}>
                ⭐️ Make Magic ⭐️
              </button>
            ) : (
              <button className={s.makeMagicBtn} onClick={stopMagic}>
                🔥 Stop Magic 🔥
              </button>
            )}
          </div>
          <div className={s.weatherOnDates}>
            {otherDaysWeather.length &&
              otherDaysWeather.map(
                ({
                  max_temp,
                  min_temp,
                  weather_state_abbr,
                  applicable_date,
                  id,
                }) => {
                  return (
                    <div className={s.weatherOnDate} key={id}>
                      <div className={s.weatherOnDateImgDate}>
                        <p className={s.weatherOnDateDate}>
                          {new Date(applicable_date).toLocaleString(
                            'en-US',
                            OPTIONS
                          )}
                        </p>
                        <img
                          className={s.weatherOnDateImg}
                          src={`https://www.metaweather.com/static/img/weather/png/${weather_state_abbr}.png`}
                        ></img>
                      </div>
                      <div className={s.weatherOnDateTemp}>
                        <p className={s.weatherOnDateMinTemp}>
                          {Math.round(min_temp)}°C
                        </p>
                        <p className={s.weatherOnDateMaxTemp}>
                          {Math.round(max_temp)}°C
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
          <div>
            <h3 className={s.titleHighlights}>Today's Highlights</h3>
            <div className={s.highlights}>
              <div className={s.highlight}>
                <p className={s.mb6}>Wind Status</p>
                <p className={s.text6xl}>
                  {Math.round(todayWeather?.wind_speed)} mph
                </p>
              </div>
              <div className={s.highlight}>
                <p className={s.mb6}>Humidity</p>
                <p className={s.text6xl}>{todayWeather?.humidity} %</p>
              </div>
              <div className={s.highlight}>
                <p className={s.mb6}>Visibility</p>
                <p className={s.text6xl}>
                  {Math.round(todayWeather?.visibility)} miles
                </p>
              </div>
              <div className={s.highlight}>
                <p className={s.mb6}>Air Pressure</p>
                <p className={s.text6xl}>
                  {Math.round(todayWeather?.air_pressure)} mb
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WeatherModal
        isShown={showModal}
        onClose={handleModalClose}
        todayWeather={todayWeather}
      />
    </>
  );
}
