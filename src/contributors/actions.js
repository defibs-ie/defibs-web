import axios from 'axios';

export const CONTRIBUTOR_LIST_FETCHING = 'contributors/FETCHING';
export const CONTRIBUTOR_LIST_SUCCESS = 'contributors/SUCCESS';
export const CONTRIBUTOR_LIST_ERROR = 'contributors/ERROR';

function fetchContributorList() {
  const url = `${API_URL}/contributors/`;
  return (dispatch) => {
    return axios.get(url)
      .then(({ data }) => dispatch({ type: CONTRIBUTOR_LIST_SUCCESS, payload: data }));
  }
}
export { fetchContributorList };
