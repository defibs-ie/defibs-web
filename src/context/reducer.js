import { SET_WINDOW_DIMENSIONS } from './actions';

const initialState = {
  width: null,
  height: null,
  isCompact: false,
};

export default function reducer(state=initialState, action) {
  switch (action.payload) {
    case SET_WINDOW_DIMENSIONS:
      const { width, height } = action.payload;
      const isCompact = width < 600 || height < 700;
      return { ...state, width, height, isCompact };
    default:
      return state;
  }
}
