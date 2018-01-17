import {
  DEFIB_DETAIL_CLEAR,
  DEFIB_DETAIL_FETCHING,
  DEFIB_DETAIL_SUCCESS,
  DEFIB_DETAIL_ERROR,
  DEFIB_LIST_FETCHING,
  DEFIB_LIST_SUCCESS,
  DEFIB_LIST_ERROR,
} from './actions';

export default function reducer(state = {
  defibs: [],
  defib: null,
  isFetching: false,
  isFetchingDetail: false,
}, action) {
  switch (action.type) {
    case DEFIB_DETAIL_CLEAR:
      return { ...state, defib: null, isFetchingDetail: false };
    case DEFIB_DETAIL_ERROR:
      return { ...state, isFetchingDetail: false };
    case DEFIB_DETAIL_FETCHING:
      return { ...state, isFetchingDetail: true };
    case DEFIB_DETAIL_SUCCESS:
      return { ...state, defib: action.payload, isFetchingDetail: false };
    case DEFIB_LIST_ERROR:
      return { ...state, defibs: [], isFetching: false };
    case DEFIB_LIST_FETCHING:
      return { ...state, isFetching: true };
    case DEFIB_LIST_SUCCESS:
      return { ...state, defibs: action.payload, isFetching: false };
    default:
      return state;
  }
}
