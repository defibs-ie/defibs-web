import { MOVE_TO_LOCATION, SET_VIEWPORT } from './actions';

export const DEFAULT_VIEWPORT = {
  latitude: 52,
  longitude: -8,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
  width: 500,
  height: 500,
};

function moveToLocation(state, { latitude, longitude }) {
  return { ...state, viewport: { ...state.viewport, latitude, longitude } };
}

function setViewport(state, viewport) {
  return {
    ...state,
    viewport: {
      ...viewport,
      latitude: Number(viewport.latitude),
      longitude: Number(viewport.longitude),
    },
  };
}

export default function reducer(state = { viewport: DEFAULT_VIEWPORT }, action) {
  switch (action.type) {
    case 'initial-state/LOADED':
      console.info('initial-state/LOADED');
      return setViewport(state, action.payload);
      //return { ...state, viewport: action.payload };
    case MOVE_TO_LOCATION:
      console.info([state.viewport.latitude, state.viewport.longitude]);
      return moveToLocation(state, action.payload);
    case SET_VIEWPORT:
      console.info([state.viewport.latitude, state.viewport.longitude]);
      return setViewport(state, action.payload);
      // return { ...state, viewport: action.payload };
    default:
      return state;
  }
}
