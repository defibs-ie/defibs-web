import axios from 'axios';

export const DEFIB_DETAIL_FETCHING = 'defibs/DEFIB_DETAIL_FETCHING';
export const DEFIB_DETAIL_SUCCESS = 'defibs/DEFIB_DETAIL_SUCCESS';
export const DEFIB_DETAIL_ERROR = 'defibs/DEFIB_DETAIL_ERROR';

export const DEFIB_LIST_FETCHING = 'defibs/DEFIB_LIST_FETCHING';
export const DEFIB_LIST_SUCCESS = 'defibs/DEFIB_LIST_SUCCESS';
export const DEFIB_LIST_ERROR = 'defibs/DEFIB_LIST_ERROR';

function fetchDefibDetail(id) {
  const url = `${API_URL}/defibs/${id}/`;
  return (dispatch) => {
    return axios.get(url)
      .then((response) => {
        return dispatch({ type: DEFIB_DETAIL_SUCCESS, payload: response.data });
      });
  };
}

function fetchDefibs() {
  const url = `${API_URL}/defibs/`;
  return (dispatch) => {
    dispatch({ type: DEFIB_LIST_FETCHING });
    return axios.get(url)
      .then((response) => {
        return dispatch({ type: DEFIB_LIST_SUCCESS, payload: response.data });
      });
  };
}

export {
  fetchDefibDetail,
  fetchDefibs,
};
