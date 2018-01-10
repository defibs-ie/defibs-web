import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapGL, {
  FlyToInterpolator,
  Marker,
  NavigationControl,
} from 'react-map-gl';

import { fetchDefibDetail, fetchDefibs } from '../defibs/actions';
import { persistViewportState, setViewport } from './actions';
import Pin from './Pin';

const navStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: '10px',
  zIndex: 5,
};

class MapContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = { viewport: this.props.viewport };
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.resize = this.resize.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentDidMount() {
    this.props.fetchDefibs();
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleMarkerClick(defib) {
    const { lat, lon, id } = defib;

    // Retrieve defib info
    this.props.fetchDefibDetail(id);

    // Fly to the marker position
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: Number(lat),
        longitude: Number(lon),
        zoom: Math.max(this.state.viewport.zoom, 15), // don't zoom *out*
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 500,
      },
    });
  }

  resize() {
    // Update the viewport state to resize the map
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  updateViewport(viewport) {
    this.setState({ viewport });
    this.props.persistViewportState({ viewport });
  }

  render() {
    while (!this.props.viewport) {
      return null;
    }

    const { defibs } = this.props;
    const { viewport } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken={ACCESS_TOKEN}
          onViewportChange={this.updateViewport}
        >
          {defibs.map(defib => (
            <Marker
              key={defib.id}
              longitude={Number(defib.lon)}
              latitude={Number(defib.lat)}
            >
              <Pin
                size={36}
                onClick={() => this.handleMarkerClick(defib)}
              />
            </Marker>
          ))}
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this.updateViewport} />
          </div>
        </MapGL>
      </div>
    );
  }
}

MapContainer.propTypes = {
  defibs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  fetchDefibDetail: PropTypes.func.isRequired,
  fetchDefibs: PropTypes.func.isRequired,
  persistViewportState: PropTypes.func.isRequired,
  viewport: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    bearing: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

MapContainer.defaultProps = {
  defibs: [],
  viewport: {
    latitude: 52,
    longitude: -8,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
    width: 500,
    height: 500,
  },
};

function mapState(state) {
  return {
    defibs: state.defibs.defibs,
    viewport: state.map.viewport,
  };
}

export default connect(mapState, {
  fetchDefibDetail,
  fetchDefibs,
  persistViewportState,
  setViewport,
})(MapContainer);
