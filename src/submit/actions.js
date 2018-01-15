import axios from 'axios';

export const DEFIB_SUBMIT_PENDING = 'submit/DEFIB_SUBMIT_PENDING';
export const DEFIB_SUBMIT_SUCCESS = 'submit/DEFIB_SUBMIT_SUCCESS';
export const DEFIB_SUBMIT_ERROR = 'submit/DEFIB_SUBMIT_ERROR';

function submitDefib(data) {
  const url = `${API_URL}/defibs/submit/`;
  return (dispatch) => {
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    dispatch({ type: DEFIB_SUBMIT_PENDING });
    return axios.post(
      url,
      data,
      // config,
    )
      .then(response => dispatch({ type: DEFIB_SUBMIT_SUCCESS }));
  };
}

export {
  submitDefib,
};
