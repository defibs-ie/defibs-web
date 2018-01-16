import { SET_WINDOW_DIMENSIONS } from './actions';

const initialState = {
  width: null,
  height: null,
  isCompact: false,
};

function isCompactDevice({ width, height }) {
  return width < 992 || height < 700;
}

function setWindowDimensions(state, { width, height }) {
  // console.info(`SET_WINDOW_DIMENSIONS ${width} x ${height}`); // eslint-disable-line no-console
  return {
    ...state,
    width,
    height,
    isCompact: isCompactDevice({ width, height }),
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_WINDOW_DIMENSIONS:
      console.info('SET_WINDOW_DIMENSIONS');
      return setWindowDimensions(state, action.payload);
    default:
      return state;
  }
}
