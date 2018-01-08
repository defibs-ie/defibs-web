import { combineReducers } from 'redux';
import contextReducer from './context/reducer';
import defibReducer from './defibs/reducer';
import mapReducer from './map/reducer';

export default combineReducers({
  context: contextReducer,
  defibs: defibReducer,
  map: mapReducer,
});
