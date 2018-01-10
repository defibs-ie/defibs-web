import { SET_WINDOW_DIMENSIONS } from './actions';

const initialState = {
  width: null,
  height: null,
  isCompact: false,
};

function isCompactDevice({ width, height }) {
  return width < 768 || height < 700;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_WINDOW_DIMENSIONS:
      console.info('SET_WINDOW_DIMENSIONS'); // eslint-disable-line no-console
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        isCompact: isCompactDevice(action.payload),
      };
    default:
      return state;
  }
}
