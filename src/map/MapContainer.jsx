import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DeckGL, { LineLayer } from 'deck.gl';
import MapGL, {
  FlyToInterpolator,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import { geolocated } from 'react-geolocated';
import { colors } from 'react-elemental';
import MyLocation from 'react-icons/lib/md/my-location';
import { withScriptjs } from 'react-google-maps';

import { fetchDefibDetail, fetchDefibs } from '../defibs/actions';
import { fetchDirections } from '../directions/actions';
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
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentDidMount() {
    // Fetch defib list
    // this.props.fetchDefibs();
  }

  componentWillReceiveProps(nextProps) {
    // If the props viewport has changed, we should update the state viewport
    if (this.props.viewport && nextProps.viewport && nextProps.viewport !== this.props.viewport) {
      const { latitude, longitude } = nextProps.viewport;
      this.flyToAndZoom({ latitude, longitude });
    }
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
      },
    });
    this.props.persistViewportState({ viewport });
  }

  handleMarkerClick({ lat, lon, id }) {
    // Retrieve defib info
    this.props.fetchDefibDetail(id);
    // Centre the map on the defib location
    this.flyToAndZoom({ latitude: lat, longitude: lon });
    if (this.props.isGeolocationEnabled) {
      // TODO: stop this from breaking the site
      // this.props.fetchDirections(this.props.coords, { latitude: lat, longitude: lon });
    }
  }

  updateViewport(viewport) {
    // Update viewport in state, effectively allowing interactivity
    this.setState({ viewport });
    // Persist the viewport state to local storage so that it'll
    // look OK on reload
    this.props.persistViewportState({ viewport });
  }

  render() {
    while (!this.props.viewport) {
      return null;
    }

    const {
      coords,
      defibs,
      height,
      isGeolocationEnabled,
      route,
      showDirections,
      width,
    } = this.props;

    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width={width}
        height={height}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={ACCESS_TOKEN}
        onViewportChange={this.updateViewport}
      >
        <DeckGL
          {...viewport}
          width={width}
          height={height}

          layers={[
            new LineLayer({
              getColor: () => [255, 140, 0, 0.8 * 255],
              getSourcePosition: d => d[0],
              getTargetPosition: d => d[1],
              id: 'route',
              strokeWidth: 20,
              data: route,
            }),
          ]}

          visible={route.length && showDirections}

        />
        {defibs.map(defib => (
          <Marker
            key={defib.id}
            longitude={Number(defib.lon)}
            latitude={Number(defib.lat)}
          >
            <Pin size={36} onClick={() => this.handleMarkerClick(defib)} />
          </Marker>
          ))}
        {isGeolocationEnabled && coords && (
        <Marker
          key="my-location"
          latitude={coords.latitude}
          longitude={coords.longitude}
        >
          <MyLocation style={{ color: colors.gray50, fontSize: 24 }} />
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
  coords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  defibs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  fetchDefibDetail: PropTypes.func.isRequired,
  fetchDefibs: PropTypes.func.isRequired,
  fetchDirections: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  isGeolocationEnabled: PropTypes.bool.isRequired,
  persistViewportState: PropTypes.func.isRequired,
  route: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  showDirections: PropTypes.bool,
  viewport: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    bearing: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  width: PropTypes.number.isRequired,
};

MapContainer.defaultProps = {
  coords: { latitude: null, longitude: null },
  defibs: [],
  showDirections: false,
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
    route: parseRoute(state.directions.route),
    viewport: state.map.viewport,
  };
}

function parseRoute(route) {
  if (!route) {
    return [];
  }
  const { path } = route;
  const pathLength = path.length;
  const pathPairs = path.map(point => [point.lng(), point.lat()]);
  const data = pathPairs.map((point, idx) => {
    if (idx < pathLength - 1) {
      return [
        point,
        pathPairs[idx + 1],
      ];
    }
    return undefined;
  }).filter(_ => _ !== undefined);
  return data;
}

export default geolocated()(connect(mapState, {
  fetchDefibDetail,
  fetchDefibs,
  fetchDirections,
  persistViewportState,
  setViewport,
})(compose(
  withProps({
    loadingElement: <div />,
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
  }),
  withScriptjs,
)(MapContainer)));
