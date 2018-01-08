export const SET_VIEWPORT = 'map/SET_VIEWPORT';

function persistViewportState({ viewport }) {
  return (dispatch) => {
    localStorage.setItem('viewport', JSON.stringify(viewport));
  };
}

function setViewport(viewport) {
  return (dispatch) => {
    dispatch({ type: SET_VIEWPORT, payload: viewport });
  };
}

export { persistViewportState };
