export const MOVE_TO_LOCATION = 'map/MOVE_TO_LOCATION';
export const SET_VIEWPORT = 'map/SET_VIEWPORT';

function persistViewportState({ viewport }) {
  return () => {
    localStorage.setItem('viewport', JSON.stringify(viewport));
  };
}

function setViewport(viewport) {
  return (dispatch) => {
    dispatch({ type: SET_VIEWPORT, payload: viewport });
  };
}

function moveToLocation(coords) {
  const latitude = Number(coords.latitude);
  const longitude = Number(coords.longitude);
  return dispatch => dispatch({ type: MOVE_TO_LOCATION, payload: {latitude, longitude }});
}

export {
  moveToLocation,
  persistViewportState,
  setViewport,
};
