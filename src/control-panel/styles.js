export const BASE_STYLE = {
  backgroundColor: 'white',
  maxHeight: '110px',
  opacity: 1,
  overflowX: 'hidden',
  overflowY: 'hidden',
  transition: 'all 0.3s ease',
  width: '500px',
};

export const EXPANDED_STYLE = {
  maxHeight: 'calc(100vh - 48px)',
  overflowY: 'auto',
};

export const COMPACT_STYLE = {
  boxSizing: 'border-box',
  maxHeight: '40px',
  height: '100vh',
  overflowX: 'hidden',
  overflowY: 'auto',
  width: 'inherit',
};
