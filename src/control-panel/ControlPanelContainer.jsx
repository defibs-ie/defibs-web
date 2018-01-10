import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing, Text } from 'react-elemental';
import Header from './Header';
import DefibDetailContainer from './DefibDetailContainer';
import Pin from '../map/Pin';
import { setIsExpanded } from './actions';

class ControlPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.toggleExpansionState = this.toggleExpansionState.bind(this);
  }

  toggleExpansionState() {
    this.props.setIsExpanded(!this.props.isExpanded);
  }

  render() {
    const { defib, isCompact, isExpanded } = this.props;

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
      maxHeight: 'calc(100vh - 48px)',
      opacity: 1,
      overflowY: 'auto',
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

ControlPanelContainer.propTypes = {
  setIsExpanded: PropTypes.func.isRequired,
  isCompact: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  defib: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ControlPanelContainer.defaultProps = {
  defib: null,
};

function renderDefibDetail({ defib }) {
  return <DefibDetailContainer defib={defib} />;
}

renderDefibDetail.propTypes = {
  defib: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

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
    isExpanded: state.controlPanel.isExpanded,
  };
}

export default connect(mapState, { setIsExpanded })(ControlPanelContainer);
