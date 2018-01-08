import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spacing } from 'react-elemental';
import Header from './Header';
import DefibDetailContainer from './DefibDetailContainer';

class ControlPanelContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: !props.isCompact,
    };
    this.toggleExpansionState = this.toggleExpansionState.bind(this);
  }

  toggleExpansionState() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { defib, isCompact } = this.props;
    const { isExpanded } = this.state;

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
        <Spacing size="large" bottom>
          <Header
            isExpanded={isExpanded}
            isCompact={isCompact}
            onExpandClick={this.toggleExpansionState}
          />
        </Spacing>

        {isExpanded && defib && (
          <Spacing size="large" bottom>
            <DefibDetailContainer defib={defib} />
          </Spacing>
        )}
      </Spacing>
    </Spacing>
    );
  }
}

function mapState(state) {
  return {
    defib: state.defibs.defibDetail,
  };
}

export default connect(mapState)(ControlPanelContainer);
