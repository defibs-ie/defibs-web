import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing, Text } from 'react-elemental';
import { geolocated, geoPropTypes } from 'react-geolocated';
import TabContainer from './TabContainer';
import TravelModeSelector from './TravelModeSelector';

function DefibDetailContainer(props) {
  const { defib, isCompact, isGeolocationEnabled } = props;
  return (
    <Spacing>
      <Spacing
        bottom
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          whiteSpace: 'pre-line',
        }}
      >
        <Text size="epsilon" bold>
          {defib.address}
        </Text>
        <a
          href={`https://maps.google.com?q=${defib.lat},${defib.lon}`}
          target="_blank"
          rel="noopen noreferrer"
        >
          <img
            alt="Open with Google Maps"
            src="https://s3-eu-west-1.amazonaws.com/assets.defibs.ie/images/google-maps.png"
            style={{
              width: '36px',
            }}
          />
        </a>
      </Spacing>
      {isGeolocationEnabled && (
        <Spacing bottom>
          <Text size="kilo" bold>Show directions</Text>
          <TravelModeSelector defib={defib} />
        </Spacing>
      )}
      <Spacing bottom>
        <Text size="kilo" bold>Notes</Text>
        <Text>
          {defib.notes}
        </Text>
      </Spacing>
      <Spacing bottom>
        {isCompact ? <TabContainer defib={defib} /> : renderPhoto(defib)}
      </Spacing>
    </Spacing>
  );
}

function renderPhoto(defib) {
  if (defib.image) {
    return (
      <img
        alt="Photograph of this defibrillator"
        src={defib.image}
        style={{ width: '100%' }}
      />
    );
  }
  return null;
}

function mapState({ screen }) {
  return {
    isCompact: screen.isCompact,
  };
}

DefibDetailContainer.propTypes = {
  defib: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isCompact: PropTypes.bool.isRequired,
  ...geoPropTypes,
};

export default geolocated()(connect(mapState, {})(DefibDetailContainer));
