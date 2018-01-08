export const SET_WINDOW_DIMENSIONS = 'context/SET_WINDOW_DIMENSIONS';

function setWindowDimensions(width, height) {
  return (dispatch) => {
    console.info('width: ' + width);
    console.info('height' + height);
    dispatch({ type: SET_WINDOW_DIMENSIONS, payload: { width, height } });
  };
}

export {
  setWindowDimensions,
};
