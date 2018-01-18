import {
  DIRECTIONS_CLEAR,
  DIRECTIONS_FETCHING,
  DIRECTIONS_SUCCESS,
  SET_TRAVEL_MODE,
} from './actions';

function handleDirectionsSuccess(state, payload) {
  const { legs: [{ distance, duration }, ..._] } = payload;
  console.info(distance);
  return {
    ...state,
    distance,
    duration,
    route: payload,
  };
}

const INITIAL_STATE = {
  distance: null,
  duration: null,
  mode: null,
  route: null,
};

export default function reducer(state = INITIAL_STATE , action) {
  switch (action.type) {
    case DIRECTIONS_CLEAR:
      return INITIAL_STATE;
    case DIRECTIONS_SUCCESS:
      return handleDirectionsSuccess(state, action.payload);
    case SET_TRAVEL_MODE:
      return { ...state, mode: action.payload };
    case DIRECTIONS_FETCHING:
    default:
      return state;
  }
}
