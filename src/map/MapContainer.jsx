import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { Layer, Feature, Marker, Source, ZoomControl } from 'react-mapbox-gl';

import { fetchDefibDetail, fetchDefibs } from '../defibs/actions';
import { persistMapState, setViewport } from './actions';

class MapContainer extends Component {

  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
  }

  componentDidMount() {
    this.props.fetchDefibs();
  }

  handleClick(map, event) {
    console.info(map);
    console.info(event);
  }

  handleViewportChange(viewport) {
    this.props.setViewport(viewport);
  }

  onMoveEnd(map) {
    const { lat, lng } = map.getCenter();
    const zoom = map.getZoom();
    this.props.persistMapState({ lat, lng, zoom });
  }

  render() {

		const styles = {
			marker: {
				width: 30,
				height: 30,
				borderRadius: '50%',
				backgroundColor: '#E0E0E0',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				border: '2px solid #C9C9C9',
        cursor: 'pointer',
			},
		};
    const { lat, lng, zoom } = this.props.initialState;
    const { defibs } = this.props;
    const Map = ReactMapboxGl({
      accessToken: ACCESS_TOKEN,
    });

    console.info(`Placing ${defibs.length} markers`);

    console.info('defibs');
    console.info(defibs);

    return (
      <div style={{ position: 'absolute' }}>
        <Map
          style="mapbox://styles/mapbox/dark-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
          center={[ lng, lat ]}
          zoom={[zoom]}
          onClick={this.handleClick}
          onMoveEnd={this.onMoveEnd}
        >
          <Source
            id="defib-source-id"
            geoJsonSource={{
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": defibs.map(defib => ({
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [defib.lat, defib.lon],
                  },
                  "properties": {
                    "address": defib.address,
                  },
                })),
              },
            }}
          />
          <Layer
            id="points"
            type="symbol"
            sourceId="defib-source-id"
            layout={{ "icon-image": "marker-15" }}
            paint={{ }}
          >
          </Layer>
          <ZoomControl
            position="bottom-right"
          />
        </Map>
      </div>
    );
  }
}

MapContainer.defaultProps = {
  defibs: [],
};

function mapState(state) {
  return {
    defibs: state.defibs.defibs,
    initialState: state.map,
  };
}

export default connect(mapState, {
  fetchDefibDetail,
  fetchDefibs,
  persistMapState,
  setViewport,
})(MapContainer);
