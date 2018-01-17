export const DIRECTIONS_FETCHING = 'directions/FETCHING';
export const DIRECTIONS_SUCCESS = 'directions/SUCCESS';
export const DIRECTIONS_ERROR = 'directions/ERROR';

// We need the Google script to have loaded in order to fetch directions.
// This is handled by main.jsx, but might error --- we need to figure out
// how to handle it.
function fetchDirections(here, there) {
  return (dispatch) => {
    const format = ({ latitude, longitude }) => new google.maps.LatLng(latitude, longitude);
    // Call the Google Maps direction service for a route between these two points
    const directionsService = new google.maps.DirectionsService();
    directionsService.route({
      origin: format(here),
      destination: format(there),
      // Default to using walking directions
      travelMode: google.maps.TravelMode.WALKING,
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

// eslint-disable-next-line import/prefer-default-export
export { fetchDirections };
