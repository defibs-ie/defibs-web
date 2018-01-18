import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing } from 'react-elemental';
import { geolocated, geoPropTypes } from 'react-geolocated';

import Header from './Header';
import DefibDetailContainer from './DefibDetailContainer';
import { clearDefib } from '../defibs/actions';
import { clearDirections } from '../directions/actions';
import { moveToLocation } from '../map/actions';
import { setIsExpanded } from './actions';
import { BASE_STYLE, COMPACT_STYLE, EXPANDED_STYLE } from './styles';
import EmptyDetail from './EmptyDetail';

class ControlPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.handleMyLocationClick = this.handleMyLocationClick.bind(this);
    this.toggleExpansionState = this.toggleExpansionState.bind(this);
  }

  handleMyLocationClick() {
    this.props.moveToLocation(this.props.coords);
  }

  toggleExpansionState() {
    const { isExpanded } = this.props;
    this.props.setIsExpanded(!isExpanded);
    if (this.props.defib) {
      this.props.clearDefib();
    }

    if (isExpanded && this.props.route) {
      this.props.clearDirections();
    }
  }

  render() {
    const { defib, isCompact, isExpanded } = this.props;

    // TODO: ugh, this hack
    const compactExpandedStyle = {
      maxHeight: '100vh',
    };

    return (
      <Spacing
        size="large"
        style={{
        ...BASE_STYLE,
        ...isCompact && COMPACT_STYLE,
        ...isExpanded && EXPANDED_STYLE,
        ...isCompact && isExpanded && compactExpandedStyle,
      }}
        right
        left
        padding
      >
        <Spacing
          size={(isCompact && !isExpanded) ? 'tiny' : 'large'}
          style={{ transition: 'all 0.3s ease' }}
          top
          bottom
          padding
        >
          <Spacing size="large">
            <Header
              isExpanded={isExpanded}
              isCompact={isCompact}
              onExpandClick={this.toggleExpansionState}
              onMyLocationClick={this.handleMyLocationClick}
            />
          </Spacing>

          {isExpanded && (
          <Spacing size="large" top bottom>
            {defib ? <DefibDetailContainer defib={defib} /> : <EmptyDetail {...this.props} />}
          </Spacing>
        )}
        </Spacing>
      </Spacing>
    );
  }
}

ControlPanelContainer.propTypes = {
  ...geoPropTypes,
  setIsExpanded: PropTypes.func.isRequired,
  isCompact: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  defib: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ControlPanelContainer.defaultProps = {
  defib: null,
};

function mapState(state) {
  return {
    defib: state.defibs.defib,
    isCompact: state.screen.isCompact,
    isExpanded: state.controlPanel.isExpanded,
    route: state.directions.route,
  };
}

export default geolocated()(connect(
  mapState,
  {
    clearDefib, clearDirections, moveToLocation, setIsExpanded,
  },
)(ControlPanelContainer));
