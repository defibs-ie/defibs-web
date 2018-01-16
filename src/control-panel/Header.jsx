import React from 'react';
import PropTypes from 'prop-types';
import { Text, colors } from 'react-elemental';
import MyLocation from 'react-icons/lib/md/my-location';
import KeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import { geolocated } from 'react-geolocated';

function Header(props) {
  const {
    isExpanded,
    isGeolocationEnabled,
    onExpandClick,
    onMyLocationClick,
  } = props;
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
      <Text bold uppercase>defibs.ie</Text>
      {isGeolocationEnabled && (
        <div
          role="button"
          onClick={onMyLocationClick}
          onKeyUp={onMyLocationClick}
          style={{ cursor: 'pointer' }}
          tabIndex={-1}
        >
          <MyLocation
            style={{
              color: colors.gray50,
              fontSize: '24px',
            }}
          />
        </div>
      )}
      <div
        role="button"
        onClick={onExpandClick}
        onKeyUp={onExpandClick}
        style={{ cursor: 'pointer' }}
        tabIndex={-1}
      >
        <KeyboardArrowUp
          style={{
            color: colors.gray50,
            fontSize: '24px',
            transform: `rotate(${isExpanded ? 0 : 180}deg)`,
            transition: 'all 0.3s ease',
          }}
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  isGeolocationEnabled: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  onMyLocationClick: PropTypes.func.isRequired,
};

export default geolocated()(Header);
