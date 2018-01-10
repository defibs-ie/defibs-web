import { combineReducers } from 'redux';
import contextReducer from './context/reducer';
import defibReducer from './defibs/reducer';
import mapReducer from './map/reducer';
import controlPanelReducer from './control-panel/reducer';
import contributorReducer from './contributors/reducer';
import submitReducer from './submit/reducer';

export default combineReducers({
  context: contextReducer,
  contributors: contributorReducer,
  controlPanel: controlPanelReducer,
  defibs: defibReducer,
  map: mapReducer,
  submit: submitReducer,
});
