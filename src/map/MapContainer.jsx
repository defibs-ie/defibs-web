import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapGL, {
  FlyToInterpolator,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import { colors } from 'react-elemental';
import MyLocation from 'react-icons/lib/md/my-location';

import { fetchDefibDetail, fetchDefibs } from '../defibs/actions';
import { persistViewportState, setViewport } from './actions';
import Pin from './Pin';

const navStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: '10px',
  zIndex: 2,
};

class MapContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = { viewport: this.props.viewport };
    this.flyToAndZoom = this.flyToAndZoom.bind(this);
    this.handleGeolocationProps = this.handleGeolocationProps.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.resize = this.resize.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentDidMount() {
    // Fetch defib list
    this.props.fetchDefibs();
    // Add a resize event listener
    window.addEventListener('resize', this.resize);
    // Call the event listener, just to initialize things
    this.resize();
  }

  componentWillReceiveProps(nextProps) {
    // If the props viewport has changed, we should update the state viewport
    if (this.props.viewport && nextProps.viewport && nextProps.viewport !== this.props.viewport) {
      console.info('props.viewport has changed');
      const { latitude, longitude } = nextProps.viewport;
      this.flyToAndZoom({ latitude, longitude });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  flyToAndZoom({ latitude, longitude }) {
    // Fly to the marker position
    const viewport = {
      ...this.state.viewport,
      latitude,
      longitude,
      zoom: Math.max(this.state.viewport.zoom, 15), // don't zoom *out*
      transitionDuration: 500,
    };
    this.setState({
      viewport: {
        ...viewport,
        transitionInterpolator: new FlyToInterpolator(),
    }});
    this.props.persistViewportState({ viewport });
  }

  handleGeolocationProps(coords) {
    this.setState({
        viewport: {
          ...viewport,
          longitude: coords.longitude,
          latitude: coords.latitude,
        },
    });
  }

  handleMarkerClick(defib) {
    const { lat, lon, id } = defib;

    // Retrieve defib info
    this.props.fetchDefibDetail(id);

    this.flyToAndZoom({ latitude: lat, longitude: lon });
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

    const { coords, defibs, isGeolocationEnabled } = this.props;
    const { viewport } = this.state;

    return (
        <MapGL
          { ...viewport}
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
          {isGeolocationEnabled && coords && (
            <Marker
              key="my-location"
              latitude={coords.latitude}
              longitude={coords.longitude}
            >
              <MyLocation
                style={{
                  color: colors.gray50,
                  fontSize: 24,
                }}
              />
            </Marker>
          )}
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this.updateViewport} />
          </div>
        </MapGL>
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

export default geolocated()(connect(mapState, {
  fetchDefibDetail,
  fetchDefibs,
  persistViewportState,
  setViewport,
})(MapContainer));
