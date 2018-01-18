import React, { Fragment } from 'react';
import { Spacing, Text } from 'react-elemental';
import PropTypes from 'prop-types';
import { geoPropTypes } from 'react-geolocated';
import Menu from 'react-icons/lib/md/menu';
import MyLocation from 'react-icons/lib/md/my-location';

import Pin from '../map/Pin';

export default function EmptyDetail({ isCompact, isGeolocationEnabled, coords }) {
  return (
    <Fragment>
      <Spacing bottom>
        <Text>
          Click on a defibrillator marker
          {' '}
          <Pin
            size={20}
            style={{
              transform: 'translateY(3.333333px)',
              cursor: 'default',
            }}
          />
          {' '}
          for more information.
        </Text>
      </Spacing>
      {isCompact && (
        <Spacing bottom>
          <Text>
            Click on the menu icon
            {' '}
            <Menu />
            {' '}
            for more options.
          </Text>
        </Spacing>
      )}
      {isGeolocationEnabled && coords && (
        <Spacing bottom>
          <Text>
            Click on the crosshairs
            {' '}
            <MyLocation />
            {' '}
            to zoom to your location.
          </Text>
        </Spacing>
      )}
    </Fragment>
  );
}

EmptyDetail.propTypes = {
  isCompact: PropTypes.bool.isRequired,
  ...geoPropTypes,
};
