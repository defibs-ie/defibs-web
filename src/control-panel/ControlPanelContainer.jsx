import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spacing, Text } from 'react-elemental';
import Header from './Header';
import DefibDetailContainer from './DefibDetailContainer';
import Pin from '../map/Pin';

class ControlPanelContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { isExpanded: !props.isCompact };
    this.toggleExpansionState = this.toggleExpansionState.bind(this);
  }

  toggleExpansionState() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { defib, isCompact } = this.props;
    const { isExpanded } = this.state;

    console.info('ControlPanelContainer isCompact? ' + isCompact);

    const baseStyle = {
      backgroundColor: 'white',
      maxHeight: '110px',
      opacity: 0.5,
      overflowX: 'hidden',
      overflowY: 'hidden',
      transition: 'all 0.3s ease',
      width: '500px',
    };

    const expandedStyle = {
      maxHeight: '100vh',
      opacity: 1,
    };

    const compactStyle = {
      boxSizing: 'border-box',
      maxHeight: '40px',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'auto',
      width: 'inherit',
    };

    return (
    <Spacing
      size="large"
      style={{
        ...baseStyle,
        ...isCompact && compactStyle,
        ...isExpanded && expandedStyle,
      }}
      right
      left
      padding
    >
      <Spacing
        size={(isCompact && !isExpanded) ? 'tiny' : 'large'}
        style={{ transition: 'all 0.15s ease' }}
        top
        bottom
        padding
      >
        <Spacing size="large">
          <Header
            isExpanded={isExpanded}
            isCompact={isCompact}
            onExpandClick={this.toggleExpansionState}
          />
        </Spacing>

        {isExpanded && (
          <Spacing size="large" top bottom>
              {defib ? renderDefibDetail({ defib }) : renderEmptyDetail() }
          </Spacing>
        )}
      </Spacing>
    </Spacing>
    );
  }
}

function renderDefibDetail({ defib }) {
  return <DefibDetailContainer defib={defib} />;
}

function renderEmptyDetail() {
  return (
    <Text>
      Click on a defibrillator marker
      {' '}
      <Pin
        size={20}
        style={{
          transform: 'none',
          cursor: 'default',
        }}
      />
      {' '}
      for more information.
    </Text>
  );
}

function mapState(state) {
  return {
    defib: state.defibs.defibDetail,
    isCompact: state.context.isCompact,
  };
}

export default connect(mapState)(ControlPanelContainer);
