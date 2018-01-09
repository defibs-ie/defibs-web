import React, { PureComponent } from 'react';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

export default class Pin extends PureComponent {
  render() {
    const { size=41.25, onClick } = this.props;
    return (
      <svg
        width={size * 29 / 41.25}
        height={size}
        viewBox="0 0 29 41.25"
        onClick={onClick}
        style={{
          ...pinStyle,
          ...this.props.style,
        }}
      >
        <path
          d="m 14.5,0.5 c -7.73,0 -14,6.27 -14,14 0,10.5 14,26 14,26 0,0 14,-15.5 14,-26 0,-7.73 -6.27,-14 -14,-14 z m 0,19 c -2.76,0 -5,-2.24 -5,-5 0,-2.76 2.24,-5 5,-5 2.76,0 5,2.24 5,5 0,2.76 -2.24,5 -5,5 z"
          id="path3053"
          style={{
            stroke: '#ffffff',
            fill: '#8b0000',
            strokeWidth: '2',
          }}
        />
        <path
          d="m -9.5,-3.5 h 48 v 48 h -48 z"
          id="path3055"
          style={{ "fill": "none" }}
         />
      </svg>
    );
  }
}
