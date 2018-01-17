import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, colors } from 'react-elemental';
import MyLocation from 'react-icons/lib/md/my-location';
import Clear from 'react-icons/lib/md/clear';
import KeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import { geolocated } from 'react-geolocated';

function Header(props) {
  const {
    defib,
    isExpanded,
    isGeolocationEnabled,
    onExpandClick,
    onMyLocationClick,
  } = props;

  console.info(props);

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
        {defib
        ? (
         <Clear
            style={{
              color: colors.gray50,
              fontSize: '24px',
              transition: 'all 0.3s ease',
            }}
          />
       ) : (
          <KeyboardArrowUp
            style={{
              color: colors.gray50,
              fontSize: '24px',
              transform: `rotate(${isExpanded ? 0 : 180}deg)`,
              transition: 'all 0.3s ease',
            }}
          />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  defib: PropTypes.object,
  isExpanded: PropTypes.bool.isRequired,
  isGeolocationEnabled: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  onMyLocationClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  defib: null,
};

function mapState({ defibs }) {
  return {
    defib: defibs.defib,
  };
}

export default geolocated()(connect(mapState)(Header));
