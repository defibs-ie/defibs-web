import {
  DIRECTIONS_FETCHING,
  DIRECTIONS_SUCCESS,
  SET_TRAVEL_MODE,
} from './actions';

export default function reducer(state = { route: null }, action) {
  switch (action.type) {
    case DIRECTIONS_SUCCESS:
      return { ...state, route: action.payload };
    case SET_TRAVEL_MODE:
      return { ...state, mode: action.payload };
    case DIRECTIONS_FETCHING:
    default:
      return state;
  }
}
