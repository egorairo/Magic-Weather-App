import React, {useState} from 'react';
import Modal from 'react-modal';

import WeatherModal from '../WeatherModal/WeatherModal';
import s from './WeatherDetailedSection.module.css';

const EMOJIS = [...Array(600000).keys()]
  .map((v) => String.fromCharCode(v))
  .filter((v) =>
    /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu.test(
      v
    )
  );

export default function DetailedScreen({today, otherDays}) {
  const options = {weekday: 'short', day: 'numeric', month: 'short'};

  const [clicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);

  const handleSearchClick = () => {
    setShow(true);
  };

  const handleMagicClick = () => {
    console.log(EMOJIS);
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
            <button className={s.makeMagicBtn} onClick={handleMagicClick}>
              ⭐️ Make Magic ⭐️
            </button>
          </div>
          <div className={s.weatherOnDates}>
            {otherDays.map(
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
                          options
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
                <p className={s.text6xl}>{Math.round(today.wind_speed)} mph</p>
              </div>
              <div className={s.highlight}>
                <p className={s.mb6}>Humidity</p>
                <p className={s.text6xl}>{today.humidity} %</p>
              </div>
              <div className={s.highlight}>
                <p className={s.mb6}>Visibility</p>
                <p className={s.text6xl}>
                  {Math.round(today.visibility)} miles
                </p>
              </div>
              <div className={s.highlight}>
                <p className={s.mb6}>Air Pressure</p>
                <p className={s.text6xl}>{Math.round(today.air_pressure)} mb</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <WeatherModal
          isShow={show}
          onClose={() => setShow(false)}
          today={today}
        />
      }
    </>
  );
}

<button className={s.searchClose}>
  <span className={s.materialIcons}>close</span>
</button>;
