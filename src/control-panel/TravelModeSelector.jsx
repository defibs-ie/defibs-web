import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing } from 'react-elemental';
import { geolocated, geoPropTypes } from 'react-geolocated';
import Bike from 'react-icons/lib/md/directions-bike';
import Car from 'react-icons/lib/md/directions-car';
import Clear from 'react-icons/lib/md/clear';
import Walk from 'react-icons/lib/md/directions-walk';

import { BUTTON_STYLE } from '../styles/button';
import { fetchDirections, setTravelMode } from '../directions/actions';

const TRAVEL_MODES = [
  { icon: <Clear fontSize={24} />, mode: null },
  { icon: <Bike fontSize={24} />, mode: 'bicycling' },
  { icon: <Car fontSize={24} />, mode: 'driving' },
  { icon: <Walk fontSize={24} />, mode: 'walking' },
];

function TravelModeSelector(props) {
  const {
    coords, defib, duration, selectedMode,
  } = props;
  return (
    <Spacing
      bottom
      left
      right
      top
      style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      {TRAVEL_MODES.map(({ icon, mode }) => (
        <button
          key={mode}
          onClick={() => handleClick(mode)}
          style={{
            ...BUTTON_STYLE,
            color: mode === selectedMode ? '#8b0000' : BUTTON_STYLE.color,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all .2s ease',
          }}
        >
          {icon}
          {mode !== null && mode === selectedMode && duration ? (
            <span style={{ color: BUTTON_STYLE.color }}>{ duration.text }</span>
          ) : ''
          }
        </button>
      ))}
    </Spacing>
  );

  function handleClick(mode) {
    // Set the travel mode
    props.setTravelMode(mode);
    // Fetch directions
    props.fetchDirections(coords, { latitude: defib.lat, longitude: defib.lon }, mode);
  }
}

TravelModeSelector.propTypes = {
  defib: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  selectedMode: PropTypes.string,
  ...geoPropTypes,
};

TravelModeSelector.defaultProps = {
  selectedMode: null,
};

function mapState({ directions }) {
  return {
    duration: directions.duration,
    selectedMode: directions.mode,
  };
}

export default geolocated()(connect(
  mapState,
  { fetchDirections, setTravelMode },
)(TravelModeSelector));
