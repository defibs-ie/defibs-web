import axios from 'axios';

export const DEFIB_DETAIL_CLEAR = 'defibs/DEFIB_DETAIL_CLEAR';
export const DEFIB_DETAIL_FETCHING = 'defibs/DEFIB_DETAIL_FETCHING';
export const DEFIB_DETAIL_SUCCESS = 'defibs/DEFIB_DETAIL_SUCCESS';
export const DEFIB_DETAIL_ERROR = 'defibs/DEFIB_DETAIL_ERROR';

export const DEFIB_LIST_FETCHING = 'defibs/DEFIB_LIST_FETCHING';
export const DEFIB_LIST_SUCCESS = 'defibs/DEFIB_LIST_SUCCESS';
export const DEFIB_LIST_ERROR = 'defibs/DEFIB_LIST_ERROR';

function clearDefib() {
  return dispatch => dispatch({ type: DEFIB_DETAIL_CLEAR });
}

function fetchDefibDetail(id) {
  const url = `${API_URL}/defibs/${id}/`;
  return dispatch => axios.get(url)
    .then(response => dispatch({
      type: DEFIB_DETAIL_SUCCESS,
      payload: {
        ...response.data,
        lat: Number(response.data.lat),
        lon: Number(response.data.lon),
      },
    }));
}

function fetchDefibs() {
  const url = `${API_URL}/defibs/`;
  return (dispatch) => {
    dispatch({ type: DEFIB_LIST_FETCHING });
    return axios.get(url)
      .then(response => dispatch({
        type: DEFIB_LIST_SUCCESS,
        payload: response.data.map(defib => ({
          ...defib,
          lat: Number(defib.lat),
          lon: Number(defib.lon),
        })),
      }));
  };
}

export {
  clearDefib,
  fetchDefibDetail,
  fetchDefibs,
};
