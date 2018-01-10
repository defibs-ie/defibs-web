import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing, Tabs } from 'react-elemental';
import MapGL, { Marker } from 'react-map-gl';

import Pin from '../map/Pin';

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'map' };
    this.handleChange = this.handleChange.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleChange(value) {
    this.setState({ value });
  }

  resize() {
    this.setState({ mapWidth: this.thing.clientWidth });
  }

  render() {
    const { mapWidth, value } = this.state;
    const { defib } = this.props;

    // Get options
    const options = [{ value: 'map', label: 'MAP' }];
    if (defib.image) {
      options.push({ value: 'image', label: 'PHOTO' });
    }

    return (
      <div ref={(thing) => { this.thing = thing; }}>
        <Tabs
          options={options}
          onChange={this.handleChange}
          value={value}
        />
        <Spacing>
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
        <MapGL
          mapboxApiAccessToken={ACCESS_TOKEN}
          width={mapWidth || 0}
          height={400}
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
