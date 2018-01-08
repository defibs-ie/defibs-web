import {
  DEFIB_DETAIL_FETCHING,
  DEFIB_DETAIL_SUCCESS,
  DEFIB_DETAIL_ERROR,
  DEFIB_LIST_FETCHING,
  DEFIB_LIST_SUCCESS,
  DEFIB_LIST_ERROR,
} from './actions';

export default function reducer(state = {
  defibs: [],
  defibDetail: null,
}, action) {
  switch (action.type) {
    case DEFIB_DETAIL_SUCCESS:
      return { ...state, defibDetail: action.payload };
    case DEFIB_LIST_SUCCESS:
      return { ...state, defibs: action.payload };
    case DEFIB_LIST_ERROR:
      return { ...state, defibs: [] };
    default:
      return state;
  }
}
