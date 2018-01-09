import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spacing } from 'react-elemental';

import { MapContainer } from '../map';
import { HeaderContainer } from '../header';
import { ControlPanelContainer } from '../control-panel';
import withWindowDimensions from '../shared/withWindowDimensions';
import { setWindowDimensions } from '../context/actions';

class AppContainer extends Component {

  componentDidMount() {
    this.props.setWindowDimensions(
      window.innerWidth,
      window.innerHeight,
    );
  }

	render() {
    const { isCompact } = this.props;

    const baseStyle = {
      position: 'absolute',
      transition: 'all 0.15s ease',
      zIndex: 2,
    };

    const normalStyle = {
      right: 0,
    };

    const compactStyle = {
      left: 0,
      top: 0,
      width: '100%',
    };

    return (
      <div>
        <HeaderContainer />
        <div style={{ width: '100%', height: '100%' }}>
          <MapContainer />
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
      </div>
    );
	}
}

function mapState(state) {
  return {
    isCompact: state.context.isCompact,
  };
}

export default connect(mapState, { setWindowDimensions })(AppContainer);
