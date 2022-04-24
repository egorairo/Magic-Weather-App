import React from 'react';
import Modal from 'react-modal';

import {SearchWeatherForm} from 'entities/weather';

import s from './WeatherModal.module.css';

export default function WeatherModal({isShown, onClose}) {
  return (
    <div>
      <>
        <Modal
          isOpen={isShown}
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
              <span className={s.title}>Magic Weather</span>
            </h2>
            <SearchWeatherForm onWeather={onClose} />
          </div>
        </Modal>
      </>
    </div>
  );
}
