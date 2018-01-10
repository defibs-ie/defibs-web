import { DEFIB_DETAIL_SUCCESS } from '../defibs/actions';
import { SET_IS_EXPANDED } from './actions';

export default function reducer(state = { isExpanded: false }, action) {
  switch (action.type) {
    case DEFIB_DETAIL_SUCCESS:
      return { ...state, isExpanded: true };
    case SET_IS_EXPANDED:
      return { ...state, isExpanded: action.payload };
    default:
      return state;
  }
}
