import {
  DEFIB_SUBMIT_ERROR,
  DEFIB_SUBMIT_PENDING,
  DEFIB_SUBMIT_SUCCESS,
} from './actions';

const INITIAL_STATE = {
  isSubmitting: false,
  response: undefined,
  err: undefined,
};

export default function reducer(state=INITIAL_STATE, action) {
  switch (action.type) {
    case DEFIB_SUBMIT_PENDING:
      console.info('defib submit pending');
      return { ...state, isSubmitting: true };
    case DEFIB_SUBMIT_SUCCESS:
      return { ...state, isSubmitting: false, response: action.payload };
    case DEFIB_SUBMIT_ERROR:
      return { ...state, isSubmitting: false, err: action.payload };
    default:
      return state;
  }
}
