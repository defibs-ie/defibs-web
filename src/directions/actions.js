export const DIRECTIONS_CLEAR = 'directions/CLEAR';
export const DIRECTIONS_FETCHING = 'directions/FETCHING';
export const DIRECTIONS_SUCCESS = 'directions/SUCCESS';
export const DIRECTIONS_ERROR = 'directions/ERROR';
export const SET_TRAVEL_MODE = 'directions/SET_TRAVEL_MODE';

// We need the Google script to have loaded in order to fetch directions.
// This is handled by main.jsx, but might error --- we need to figure out
// how to handle it.
function fetchDirections(here, there, mode='WALKING') {
  return (dispatch) => {
    console.info('fetching directions, maybe');
    if (mode === null) {
      return dispatch({ type: DIRECTIONS_CLEAR });
    }
    console.info(`fetching directions for mode: ${mode.toUpperCase()}`);
    const format = ({ latitude, longitude }) => new google.maps.LatLng(latitude, longitude);
    // Call the Google Maps direction service for a route between these two points
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: format(here),
      destination: format(there),
      // Default to using walking directions
      travelMode: google.maps.TravelMode[mode.toUpperCase()],
    }, (result, status) => {
      // If there was a problem, just return
      if (status !== google.maps.DirectionsStatus.OK) {
        return;
      }
      // Extract and dispatch the first available route
      const { routes } = result;
      dispatch({ type: DIRECTIONS_SUCCESS, payload: routes[0] });
    });
  };
}

function setTravelMode(mode) {
  return dispatch => dispatch({ type: SET_TRAVEL_MODE, payload: mode });
}

export {
  fetchDirections,
  setTravelMode,
};
