import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { bootstrap } from 'react-elemental';
import karlaBold from 'react-elemental-fonts/karla-bold';
import karlaRegular from 'react-elemental-fonts/karla-regular';

import reducer from './reducer';
import { Header } from './header';
import { AppContainer } from './app';

bootstrap({
	primary: {
    regular: karlaRegular,
    bold: karlaBold,
  },
});

const store = applyMiddleware(reduxThunk)(createStore)(reducer);

/* Initialize map state */
const initialState = JSON.parse(localStorage.getItem('map') || {});
const lat = initialState.lat || 52;
const lng = initialState.lng || -8;
const zoom = initialState.zoom || 8;
store.dispatch({
  type: 'initial-state/LOADED',
  payload: { lat, lng, zoom },
});

/* Render */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('#react-root'),
);
