import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
};

// eslint-disable-next-line max-len
const PATH = 'm 14.5,0.5 c -7.73,0 -14,6.27 -14,14 0,10.5 14,26 14,26 0,0 14,-15.5 14,-26 0,-7.73 -6.27,-14 -14,-14 z m 0,19 c -2.76,0 -5,-2.24 -5,-5 0,-2.76 2.24,-5 5,-5 2.76,0 5,2.24 5,5 0,2.76 -2.24,5 -5,5 z';

const DEFAULT_FILL = '#8b0000';
const DEFAULT_STROKE = '#ffffff';
const SELECTED_FILL = '#ffffff';
const SELECTED_STROKE = '#8b0000';

export default class Pin extends PureComponent {
  render() {
    const { selected, size, onClick } = this.props;
    return (
      <svg
        width={Math.ceil((size * 29) / 41.25)}
        height={size}
        viewBox="0 0 29 41.25"
        onClick={onClick}
        style={{
          ...pinStyle,
          transform: `translateY(-${size / 2}px)`,
          ...this.props.style,
        }}
      >
        <path
          d={PATH}
          id="path3053"
          style={{
            stroke: selected ? SELECTED_STROKE : DEFAULT_STROKE, // '#ffffff',
            fill: selected ? SELECTED_FILL : DEFAULT_FILL, // '#8b0000',
            strokeWidth: '2',
            transition: 'all .3s ease',
          }}
        />
        <path
          d="m -9.5,-3.5 h 48 v 48 h -48 z"
          id="path3055"
          style={{ fill: 'none' }}
        />
      </svg>
    );
  }
}

Pin.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  selected: PropTypes.bool,
  size: PropTypes.number,
};

Pin.defaultProps = {
  onClick: () => false,
  selected: false,
  size: 41.25,
  style: {},
};

