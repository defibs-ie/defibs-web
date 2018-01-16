import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { bootstrap } from 'react-elemental';
import karlaBold from 'react-elemental-fonts/karla-bold';
import karlaRegular from 'react-elemental-fonts/karla-regular';
import sourceCodeProMedium from 'react-elemental-fonts/source-code-pro-medium';
import sourceCodeProRegular from 'react-elemental-fonts/source-code-pro-regular';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-virtualized/styles.css';

import reducer from './reducer';
import { AppContainer } from './app';
import { AboutPageContainer } from './about';
import {
  SubmitContainer,
  SubmitSuccessContainer,
} from './submit';
import { ContactContainer } from './contact';
import { SET_WINDOW_DIMENSIONS } from './screen/actions';
import { SET_IS_EXPANDED } from './control-panel/actions';

bootstrap({
  primary: {
    regular: karlaRegular,
    bold: karlaBold,
  },
  secondary: {
    regular: sourceCodeProRegular,
    bold: sourceCodeProMedium,
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
  store.dispatch({
    type: SET_WINDOW_DIMENSIONS,
    payload: { width, height },
  });
});

/* Render */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AppContainer} />
        <Route path="/about" component={AboutPageContainer} />
        <Route path="/submit-success" component={SubmitSuccessContainer} />
        <Route path="/submit" component={SubmitContainer} />
        <Route path="/contact" component={ContactContainer} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#react-root'),
);
