export const SET_IS_EXPANDED = 'control-panel/SET_IS_EXPANDED';

function setIsExpanded(isExpanded) {
  return (dispatch) => {
    dispatch({ type: SET_IS_EXPANDED, payload: isExpanded });
  };
}

export {
  setIsExpanded,
};
