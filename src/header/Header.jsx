import React, { Component } from 'react';
import { Text } from 'react-elemental';

export default class Header extends Component {
  handleExpansionToggleClick(evt) {
    evt.preventDefault();
    this.props.onExpandClick();
  };

  render() {
    const { isExpanded, isCompact } = this.props;

    return (
      <div style={{ width: '100%' }}>
      </div>
    );
  }
}
