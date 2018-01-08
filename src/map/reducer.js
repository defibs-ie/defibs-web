import { SET_VIEWPORT } from './actions';

export default function reducer(state = {
  lat: 0,
  lng: 0,
  zoom: 11,
  viewport: {
  },
}, action) {
  switch (action.type) {
    case 'initial-state/LOADED':
      return { ...state, ...action.payload };
    case SET_VIEWPORT:
      return { ...state, viewport: action.payload.viewport };
    default:
      return state;
  }
}
