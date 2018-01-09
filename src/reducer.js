import { combineReducers } from 'redux';
import contextReducer from './context/reducer';
import defibReducer from './defibs/reducer';
import mapReducer from './map/reducer';
import controlPanelReducer from './control-panel/reducer';

export default combineReducers({
  context: contextReducer,
  controlPanel: controlPanelReducer,
  defibs: defibReducer,
  map: mapReducer,
});
