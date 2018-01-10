import { SET_VIEWPORT } from './actions';

export const DEFAULT_VIEWPORT = {
  latitude: 52,
  longitude: -8,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
  width: 500,
  height: 500,
};

export default function reducer(state = { viewport: DEFAULT_VIEWPORT }, action) {
  switch (action.type) {
    case 'initial-state/LOADED':
      return { ...state, viewport: action.payload };
    case SET_VIEWPORT:
      return { ...state, viewport: action.payload };
    default:
      return state;
  }
}
