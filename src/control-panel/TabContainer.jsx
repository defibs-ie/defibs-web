import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing, Tabs } from 'react-elemental';
import MapGL, { Marker } from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import Pin from '../map/Pin';

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'map' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { defib } = this.props;

    // Get options
    const options = [{ value: 'map', label: 'MAP' }];
    if (defib.image) {
      options.push({ value: 'image', label: 'PHOTO' });
    }

    return (
      <div>
        <Tabs
          options={options}
          onChange={this.handleChange}
          value={value}
        />
        <Spacing style={{ width: '100%' }}>
          {renderTabContent()}
        </Spacing>
      </div>
    );

    function renderTabContent() {
      if (value === 'map') {
        return renderMap();
      }
      return renderImage();
    }

    function renderMap() {
      const { lat, lon } = defib;
      return (
        <div style={{ width: '100%' }}>
          <AutoSizer>
            {({ width, height }) => (
              <MapGL
                mapboxApiAccessToken={ACCESS_TOKEN}
                width={width}
                height={200}
                latitude={Number(lat)}
                longitude={Number(lon)}
                zoom={16}
              >
                <Marker
                  latitude={Number(lat)}
                  longitude={Number(lon)}
                >
                  <Pin
                    size={36}
                    latitude={Number(lat)}
                    longitude={Number(lon)}
                  />
                </Marker>
              </MapGL>
            )}
          </AutoSizer>
        </div>
      );
    }

    function renderImage() {
      return (
        <img
          alt="Photograph of this defibrillator"
          src={defib.image}
          style={{ width: '100%' }}
        />
      );
    }
  }
}

TabContainer.propTypes = {
  defib: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(null)(TabContainer);
