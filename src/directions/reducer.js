import {
  DIRECTIONS_FETCHING,
  DIRECTIONS_SUCCESS,
} from './actions';

export default function reducer(state = { route: null }, action) {
  switch (action.type) {
    case DIRECTIONS_SUCCESS:
      return { ...state, route: action.payload };
    case DIRECTIONS_FETCHING:
    default:
      return state;
  }
}
