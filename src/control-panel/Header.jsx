import React, { Component } from 'react';
import { Text, colors } from 'react-elemental';
import KeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';

export default class Header extends Component {
  render() {
    const { isExpanded, isCompact, onExpandClick } = this.props;
    return (
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Text bold uppercase>defibs.ie</Text>
        <div onClick={onExpandClick} style={{ cursor: 'pointer' }}>
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
}
