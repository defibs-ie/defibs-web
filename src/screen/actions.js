export const SET_WINDOW_DIMENSIONS = 'screen/SET_WINDOW_DIMENSIONS';

function setWindowDimensions(width, height) {
  return (dispatch) => {
    dispatch({ type: SET_WINDOW_DIMENSIONS, payload: { width, height } });
  };
}

export {
  setWindowDimensions,
};
