import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from 'store';

import Routing from './components/Routing';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
}
