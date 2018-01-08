import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spacing } from 'react-elemental';

import { MapContainer } from '../map';
import { HeaderContainer } from '../header';
import { ControlPanelContainer } from '../control-panel';
import withWindowDimensions from '../shared/withWindowDimensions';
import { setWindowDimensions } from '../context/actions';

class AppContainer extends Component {
  componentWillMount() {
    console.info('AppContainer.componentWillMount()');
    this.props.handleWindowDimensionsChange();
  }

  componentDidUpdate() {
    this.props.handleWindowDimensionsChange();
  }

	render() {
    // const { isCompact } = this.props;
    const isCompact = window.innerWidth < 600 || window.innerHeight < 700;
    console.info(`Am I compact? ${isCompact}`);
    console.info(this.props);

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
  // console.info('compact? ' + state.context.isCompact);
  return {
    isCompact: state.context.isCompact,
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    handleWindowDimensionsChange,
  };

  function handleWindowDimensionsChange() {
    console.info(`HANDLING: ${ownProps.width}, ${ownProps.height}`);
    return dispatchProps.setWindowDimensions(ownProps.width, ownProps.height);
  }
}

export default withWindowDimensions(connect(mapState, { setWindowDimensions }, mergeProps)(AppContainer));
