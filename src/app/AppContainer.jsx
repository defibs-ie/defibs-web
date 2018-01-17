import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing } from 'react-elemental';
import { geolocated } from 'react-geolocated';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import { MapContainer } from '../map';
import { fetchDefibs } from '../defibs/actions';
import { ControlPanelContainer } from '../control-panel';
import { setWindowDimensions } from '../screen/actions';
import { LayoutContainer } from '../layout';

class AppContainer extends Component {
  componentDidMount() {
    this.props.setWindowDimensions(
      window.innerWidth,
      window.innerHeight,
    );

    this.props.fetchDefibs();
  }

  render() {
    const { isCompact } = this.props;

    const baseStyle = {
      position: 'absolute',
      top: 0,
      transition: 'all 0.15s ease',
      zIndex: 2,
    };

    const normalStyle = {
      right: 0,
    };

    const compactStyle = {
      left: 0,
      top: 0,
      width: '100vw',
    };

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <LayoutContainer isMap selectedSidebarItem="home" />
        <AutoSizer>
          {({ height, width }) => (
            <MapContainer
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
        <Spacing
          style={{
            ...baseStyle,
            ...isCompact ? compactStyle : normalStyle,
          }}
          top={!isCompact}
          right={!isCompact}
        >
          <ControlPanelContainer isCompact={isCompact} />
        </Spacing>
      </div>
    );
  }
}

AppContainer.propTypes = {
  fetchDefibs: PropTypes.func.isRequired,
  isCompact: PropTypes.bool.isRequired,
  setWindowDimensions: PropTypes.func.isRequired,
};

function mapState(state) {
  return {
    isCompact: state.screen.isCompact,
  };
}

export default geolocated()(connect(mapState, { fetchDefibs, setWindowDimensions })(AppContainer));
