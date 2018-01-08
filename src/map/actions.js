export const SET_VIEWPORT = 'map/SET_VIEWPORT';

function persistMapState({ lat, lng, zoom }) {
  return (dispatch) => {
    console.info('persisting map state');
    console.info({ lat, lng, zoom });
    localStorage.setItem('map', JSON.stringify({ lat, lng, zoom }));
  };
}

function setViewport(viewport) {
  return (dispatch) => {
    dispatch({ type: SET_VIEWPORT, payload: viewport });
  };
}

export { persistMapState };
