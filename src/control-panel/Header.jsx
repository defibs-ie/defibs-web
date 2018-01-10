import React from 'react';
import PropTypes from 'prop-types';
import { Text, colors } from 'react-elemental';
import KeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';

export default function Header(props) {
  const { isExpanded, onExpandClick } = props;
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
      <Text bold uppercase>defibs.ie</Text>
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
  onExpandClick: PropTypes.func.isRequired,
};
