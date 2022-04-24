import {configureStore} from '@reduxjs/toolkit';
import {reducer} from 'entities/weather';

const store = configureStore({
  reducer: {
    weather: reducer,
  },
});

export default store;
