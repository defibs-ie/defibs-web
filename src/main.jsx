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
import { SET_WINDOW_DIMENSIONS } from './context/actions';
import { SET_IS_EXPANDED } from './control-panel/actions';

bootstrap({
	primary: {
    regular: karlaRegular,
    bold: karlaBold,
  },
});

const store = applyMiddleware(reduxThunk)(createStore)(reducer);

/* Initialize map state */
const viewport = JSON.parse(localStorage.getItem('viewport') || '{}');
if (Object.keys(viewport).length) {
  store.dispatch({
    type: 'initial-state/LOADED',
    payload: viewport,
  });
  store.dispatch({
    type: SET_IS_EXPANDED,
    payload: !(window.innerWidth < 600 || window.innerHeight < 700),
  });
}

window.addEventListener('resize', () => {
  const { innerWidth: width, innerHeight: height } = window;
  console.info('resize');
  console.info(width, height);
  store.dispatch({
    type: SET_WINDOW_DIMENSIONS,
    payload: { width, height },
  });
});

/* Render */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('#react-root'),
);
