import { combineReducers } from 'redux';
import defibReducer from './defibs/reducer';
import mapReducer from './map/reducer';
import controlPanelReducer from './control-panel/reducer';
import contributorReducer from './contributors/reducer';
import screenReducer from './screen/reducer';
import submitReducer from './submit/reducer';

export default combineReducers({
  contributors: contributorReducer,
  controlPanel: controlPanelReducer,
  defibs: defibReducer,
  map: mapReducer,
  screen: screenReducer,
  submit: submitReducer,
});
