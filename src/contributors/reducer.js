import {
  CONTRIBUTOR_LIST_SUCCESS,
} from './actions';

export default function reducer(
  state = { contributors: [], isFetching: false },
  action,
) {
  switch (action.type) {
    case CONTRIBUTOR_LIST_SUCCESS:
      return { ...state, contributorList: action.payload, isFetching: false };
    default:
      return state;
  }
}
